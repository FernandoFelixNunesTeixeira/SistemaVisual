from typing import Optional
from pydantic import BaseModel, EmailStr, Field

MATRICULA_REGEX = r"^[A-Z]{2}\d{6}[0-9X]$"
TELEFONE_REGEX = r"^\(\d{2}\)\s9\d{4}-\d{4}$"

class CreateDocenteRequest(BaseModel):
    nome: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    telefone: str = Field(
        ..., 
        pattern=TELEFONE_REGEX,
        description="Formato: (00) 00000-0000"
        )
    matricula: str = Field(
        ...,
        pattern=MATRICULA_REGEX,
        description="Formato: AA999999X",
    )
    foto: Optional[str] = None
    coordenador: int

class DocenteResponse(BaseModel):
    matricula: str
    nome: str
    email: EmailStr
    telefone: str
    foto: Optional[str] = None
    coordenador: int