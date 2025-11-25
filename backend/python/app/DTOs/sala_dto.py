from dataclasses import dataclass
from typing import Optional

@dataclass
class SalaDTO:
    nome_sala: str
    id: Optional[int] = None
    
