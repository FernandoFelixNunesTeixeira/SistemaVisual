from dataclasses import dataclass

@dataclass
class AlunoDTO:
    nome: str
    email: str
    telefone: str
    matricula: str
    periodo_de_referencia: str
    foto: str | None = None