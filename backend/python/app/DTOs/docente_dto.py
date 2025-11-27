from dataclasses import dataclass

@dataclass
class DocenteDTO:
    matricula: str
    nome: str 
    email: str
    coordenador: int
    senha: str | None = None
    telefone: str | None = None
    foto: str | None = None
