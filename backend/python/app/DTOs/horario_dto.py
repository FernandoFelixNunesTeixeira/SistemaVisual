from dataclasses import dataclass
import time

@dataclass
class HorarioDTO:
    id: str
    hora_fim: str
    hora_inicio: str
    dia_semana: str