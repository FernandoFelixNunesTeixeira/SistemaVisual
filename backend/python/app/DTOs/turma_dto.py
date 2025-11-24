from dataclasses import dataclass


@dataclass
class TurmaDTO:
    id: int
    codigoDisc: str
    nome: str
    ano: int
    semestre: int
    horarios_id: str