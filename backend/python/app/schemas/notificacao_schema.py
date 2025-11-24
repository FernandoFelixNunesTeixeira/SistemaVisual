from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class CreateNotificacaoRequest(BaseModel):
    occurred_at: datetime = Field(..., description="Timestamp da notificação")
    nome_sala: str = Field(..., min_length=1, max_length=100)
    porcentagem: Optional[float] = Field(None, ge=0, le=100, description="Porcentagem de precisão do YOLO")

class NotificacaoResponse(BaseModel):
    id: int
    occurred_at: datetime
    turmas_id: int = Field(..., description="ID da turma encontrado pelo serviço com base em sala e horario")
    porcentagem: Optional[float] = None
