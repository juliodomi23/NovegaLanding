from fastapi import FastAPI, APIRouter
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


# ── App ───────────────────────────────────────────────────────────────────────

app.include_router(api_router)

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
