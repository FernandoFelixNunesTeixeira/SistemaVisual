from typing import Optional
from pydantic import BaseModel, Field
import time 


class CreateTurmaRequest(BaseModel):
    codigoDisc: str = Field(..., min_length=2, max_length=9)
    nome: str = Field(..., min_length=2, max_length=50)
    ano: int
    semestre:int
    horarios_id: str = Field(..., min_length=2, max_length=9)
      

class TurmaResponse(BaseModel):
    id: int
    codigoDisc: str
    nome: str
    ano: int
    semestre:int
    horarios_id: str