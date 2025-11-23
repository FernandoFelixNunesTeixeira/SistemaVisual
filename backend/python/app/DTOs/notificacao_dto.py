from dataclasses import dataclass
from datetime import datetime
from typing import Optional

# DTO para request
@dataclass
class CreateNotificacaoDTO:
    occurred_at: datetime
    nome_sala: str
    porcentagem: float | None = None

# DTO para response
@dataclass
class NotificacaoDTO:
    id: int
    turmas_id: int
    occurred_at: datetime
    porcentagem: float | None = None
