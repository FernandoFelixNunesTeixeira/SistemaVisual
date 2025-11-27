from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String
from ..infrastructure.database.db import db
from ..entities.docente import Docente

class DocenteModel(db.Model):
    __tablename__ = "docentes"

    matricula: Mapped[str] = mapped_column(String(9), primary_key=True)
    nome: Mapped[str] = mapped_column(String(50), nullable=False)
    senha_hashed: Mapped[str] = mapped_column(String(255), nullable=False)
    telefone: Mapped[str] = mapped_column(String(50))
    email: Mapped[str] = mapped_column(String(50), nullable=False)
    foto: Mapped[str] = mapped_column(String(45), nullable=False)
    coordenador: Mapped[int] = mapped_column(Integer, nullable=False)

    def to_entity(self) -> Docente:
        return Docente(
            nome=self.nome,
            email=self.email,
            telefone=self.telefone,
            matricula=self.matricula,
            senha_hashed=self.senha_hashed,
            foto=self.foto,
            coordenador=self.coordenador,
        )

    @staticmethod
    def from_entity(entity: Docente):
        return DocenteModel(
            nome=entity.nome,
            email=entity.email,
            telefone=entity.telefone,
            matricula=entity.matricula,
            foto=entity.foto,
            coordenador=entity.coordenador,
            senha_hashed=entity.senha_hashed,
        )