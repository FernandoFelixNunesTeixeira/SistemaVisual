from dataclasses import dataclass

@dataclass
class CreateTurmaDTO:
    codigoDisc: str
    nome: str
    ano: int
    semestre: int
    horarios_id: str

@dataclass
class TurmaDTO:
    id: int
    codigoDisc: str
    nome: str
    ano: int
    semestre: int
    horarios_id: str