from dataclasses import dataclass
from typing import Optional

@dataclass
class AlunoDTO:
    nome: str
    email: str
    telefone: str
    matricula: str
    periodo_de_referencia: str
    foto: str | None = None
