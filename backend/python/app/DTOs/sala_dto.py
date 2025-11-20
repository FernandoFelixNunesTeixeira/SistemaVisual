from dataclasses import dataclass
from typing import Optional

@dataclass
class SalaDTO:
    nomeSala: str
    id: Optional[int] = None
    
