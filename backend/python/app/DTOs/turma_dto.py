from dataclasses import dataclass

@dataclass
class CreateTurmaDTO:
    codigo_disc: str
    nome: str
    ano: int
    semestre: int
    horarios_id: str

@dataclass
class TurmaDTO:
    id: int
    codigo_disc: str
    nome: str
    ano: int
    semestre: int
    horarios_id: str