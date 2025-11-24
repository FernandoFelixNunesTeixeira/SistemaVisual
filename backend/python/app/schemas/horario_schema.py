from typing import Optional
from pydantic import BaseModel, Field
import time 


class CreateHorarioRequest(BaseModel):
    id: str = Field(..., min_length=2, max_length=9)
    hora_inicio: str = Field(..., min_length=2, max_length=50)
    hora_fim: str = Field(..., min_length=2, max_length=50)
    dia_semana: str = Field(..., min_length=6, max_length=20)

class HorarioResponse(BaseModel):
    id: str
    hora_inicio: str
    hora_fim: str
    dia_semana: str
