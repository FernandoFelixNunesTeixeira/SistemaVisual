from dataclasses import dataclass
import time

@dataclass
class HorarioDTO:
    id: str
    hora_fim: time
    hora_inicio: time
    dia_semana: str