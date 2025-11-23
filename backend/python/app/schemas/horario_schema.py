from typing import Optional
from pydantic import BaseModel, Field
import time 


class CreateHorarioRequest(BaseModel):
    id: str = Field(..., min_length=2, max_length=9)
    horario_inicio: str = Field(..., min_length=2, max_length=50)
    horario_fim: str = Field(..., min_length=2, max_length=50)
    dia_semana: str = Field(..., min_length=6, max_length=20)

class HorarioResponse(BaseModel):
    id: str
    horario_inicio: str
    horario_fim: str
    dia_semana: str
