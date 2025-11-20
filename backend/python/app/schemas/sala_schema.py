from pydantic import BaseModel, Field

class CreateSalaRequest(BaseModel):
    nomeSala: str = Field(..., min_length=2, max_length=100)

class SalaResponse(BaseModel):
    nomeSala: str
