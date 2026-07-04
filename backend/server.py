from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException, Body
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import httpx
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Optional, List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

UPLOAD_DIR = ROOT_DIR / 'uploads'
UPLOAD_DIR.mkdir(exist_ok=True)
ALLOWED_IMAGE_TYPES = {'image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml'}
MAX_UPLOAD_SIZE = 5 * 1024 * 1024  # 5MB
CMS_COLLECTIONS = {'advisors', 'properties', 'developments'}

RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
CONTACT_EMAIL = os.environ.get('CONTACT_EMAIL', 'novegabienesraices@gmail.com')

app = FastAPI(title="Grupo Novega API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ── Models ──────────────────────────────────────────────────────────────────

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = ""
    message: str
    msg_type: Optional[str] = "contact"  # contact | job_application

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = ""
    message: str
    msg_type: str = "contact"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class LoginRequest(BaseModel):
    password: str


class PasswordUpdate(BaseModel):
    current_password: str
    new_password: str


DEFAULT_ADMIN_PASSWORD = "Novega2026"


async def get_admin_password():
    doc = await db.settings.find_one({"_id": "admin"})
    return doc["password"] if doc else DEFAULT_ADMIN_PASSWORD


# ── Routes ───────────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Grupo Novega API - OK"}


async def send_contact_email(data: ContactMessageCreate):
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY no configurada, no se envía correo")
        return
    tipo = "Solicitud de empleo" if data.msg_type == "job_application" else "Mensaje de contacto"
    body = (
        f"<h2>{tipo} desde la página web</h2>"
        f"<p><b>Nombre:</b> {data.name}</p>"
        f"<p><b>Email:</b> {data.email}</p>"
        f"<p><b>Teléfono:</b> {data.phone or 'No proporcionado'}</p>"
        f"<p><b>Mensaje:</b></p><p>{data.message}</p>"
    )
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            resp = await http.post(
                "https://api.resend.com/emails",
                headers={"Authorization": f"Bearer {RESEND_API_KEY}"},
                json={
                    "from": "Grupo Novega Web <web@novegabienesraices.com>",
                    "to": [CONTACT_EMAIL],
                    "reply_to": data.email,
                    "subject": f"{tipo}: {data.name}",
                    "html": body,
                },
            )
        if resp.status_code >= 400:
            logger.error(f"Resend error {resp.status_code}: {resp.text}")
    except Exception as e:
        logger.error(f"No se pudo enviar el correo de contacto: {e}")


@api_router.post("/contact")
async def create_contact_message(data: ContactMessageCreate):
    msg = ContactMessage(**data.model_dump())
    doc = msg.model_dump()
    await db.contact_messages.insert_one(doc)
    logger.info(f"New contact message from {data.email} (type: {data.msg_type})")
    await send_contact_email(data)
    return {"success": True, "message": "Mensaje recibido correctamente"}


@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    docs = await db.contact_messages.find({}, {"_id": 0}).to_list(500)
    return docs


# ── CMS (asesores, propiedades, desarrollos) ──────────────────────────────────

@api_router.get("/cms")
async def get_cms():
    result = {}
    for key in CMS_COLLECTIONS:
        doc = await db.cms.find_one({"_id": key})
        result[key] = doc["items"] if doc else []
    return result


@api_router.put("/cms/{collection}")
async def save_cms_collection(collection: str, items: List[dict] = Body(...)):
    if collection not in CMS_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Colección no encontrada")
    await db.cms.update_one({"_id": collection}, {"$set": {"items": items}}, upsert=True)
    return {"success": True}


# ── Admin auth ────────────────────────────────────────────────────────────────

@api_router.post("/admin/login")
async def admin_login(data: LoginRequest):
    return {"success": data.password == await get_admin_password()}


@api_router.put("/admin/password")
async def change_admin_password(data: PasswordUpdate):
    if data.current_password != await get_admin_password():
        raise HTTPException(status_code=401, detail="Contraseña actual incorrecta")
    if len(data.new_password) < 4:
        raise HTTPException(status_code=400, detail="La nueva contraseña debe tener al menos 4 caracteres")
    await db.settings.update_one({"_id": "admin"}, {"$set": {"password": data.new_password}}, upsert=True)
    return {"success": True}


# ── Subida de imágenes ─────────────────────────────────────────────────────────

@api_router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400, detail="Tipo de archivo no permitido")
    contents = await file.read()
    if len(contents) > MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=400, detail="La imagen no debe superar 5MB")
    ext = Path(file.filename or '').suffix.lower() or '.bin'
    filename = f"{uuid.uuid4().hex}{ext}"
    (UPLOAD_DIR / filename).write_bytes(contents)
    return {"url": f"/api/uploads/{filename}"}


# ── App ───────────────────────────────────────────────────────────────────────

app.include_router(api_router)
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
