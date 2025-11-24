from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from ..infrastructure.database.db import db
from ..entities.turma import Turma

class TurmaModel(db.Model):
    __tablename__ = "turmas"

    id: Mapped[int] = mapped_column(db.BigInteger, primary_key=True, autoincrement=True)
    codigoDisc: Mapped[str] = mapped_column(String(6), nullable=False)
    nome: Mapped[str] = mapped_column(String(50))
    ano: Mapped[int] = mapped_column(String(4), nullable=False)
    semestre: Mapped[int] = mapped_column(String(2))
    horarios_id: Mapped[str] = mapped_column(String(50), nullable=False)

    def to_entity(self) -> Turma:
        return Turma(
            id=self.id,
            codigoDisc=self.codigoDisc,
            nome=self.nome,
            ano=self.ano,
            semestre = self.semestre,
            horarios_id = self.horarios_id,
        )

    @staticmethod
    def from_entity(entity: Turma):
        return TurmaModel(
            id=entity.id,
            codigoDisc=entity.codigoDisc,
            nome=entity.nome,
            ano=entity.ano,
            semestre = entity.semestre,
            horarios_id = entity.horarios_id,
        )