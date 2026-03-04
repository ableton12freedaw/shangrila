from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessageCreate(BaseModel):
    student_name: Optional[str] = Field(default=None, min_length=2, max_length=120)
    date_of_birth: Optional[str] = None
    grade_standard: Optional[str] = Field(default=None, min_length=1, max_length=100)
    academic_year: Optional[str] = Field(default=None, min_length=1, max_length=50)
    parent_guardian_name: Optional[str] = Field(default=None, min_length=2, max_length=120)
    residential_address: Optional[str] = Field(default=None, min_length=5, max_length=300)
    transport_required: Optional[str] = Field(default=None, max_length=10)

    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=8, max_length=20)
    subject: str = Field(min_length=3, max_length=200)
    message: str = Field(min_length=10, max_length=2000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    student_name: Optional[str] = None
    date_of_birth: Optional[str] = None
    grade_standard: Optional[str] = None
    academic_year: Optional[str] = None
    parent_guardian_name: Optional[str] = None
    residential_address: Optional[str] = None
    transport_required: Optional[str] = None

    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str
    submitted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


@api_router.post("/contact-messages", response_model=ContactMessage)
async def create_contact_message(input_data: ContactMessageCreate):
    payload = ContactMessage(**input_data.model_dump())
    doc = payload.model_dump()
    doc["submitted_at"] = doc["submitted_at"].isoformat()

    result = await db.contact_messages.insert_one(doc)
    if not result.acknowledged:
        raise HTTPException(status_code=500, detail="Unable to save contact message")

    return payload


@api_router.get("/contact-messages", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = (
        await db.contact_messages.find({}, {"_id": 0}).sort("submitted_at", -1).to_list(500)
    )

    for message in messages:
        if isinstance(message.get("submitted_at"), str):
            message["submitted_at"] = datetime.fromisoformat(message["submitted_at"])

    return messages

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()