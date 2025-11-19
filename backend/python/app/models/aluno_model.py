from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from ..infrastructure.database.db import db
from ..entities.aluno import Aluno

class AlunoModel(db.Model):
    __tablename__ = "aluno"

    matricula: Mapped[str] = mapped_column(String(9), primary_key=True)
    nome: Mapped[str] = mapped_column(String(50), nullable=False)
    telefone: Mapped[str] = mapped_column(String(50))
    email: Mapped[str] = mapped_column(String(50), nullable=False)
    periodo_de_referencia: Mapped[str] = mapped_column(String(50))
    foto: Mapped[str] = mapped_column(String(45))

    def to_entity(self) -> Aluno:
        return Aluno(
            nome=self.nome,
            email=self.email,
            telefone=self.telefone,
            matricula=self.matricula,
            foto=self.foto,
            periodo_de_referencia=self.periodo_de_referencia,
        )

    @staticmethod
    def from_entity(entity: Aluno):
        return AlunoModel(
            nome=entity.nome,
            email=entity.email,
            telefone=entity.telefone,
            matricula=entity.matricula,
            foto=entity.foto,
            periodo_de_referencia=entity.periodo_de_referencia,
        )