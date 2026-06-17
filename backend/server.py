from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException, Body
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
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


# ── Routes ───────────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Grupo Novega API - OK"}


@api_router.post("/contact")
async def create_contact_message(data: ContactMessageCreate):
    msg = ContactMessage(**data.model_dump())
    doc = msg.model_dump()
    await db.contact_messages.insert_one(doc)
    logger.info(f"New contact message from {data.email} (type: {data.msg_type})")
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
