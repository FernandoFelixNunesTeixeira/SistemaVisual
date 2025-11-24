from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from ..infrastructure.database.db import db
from ..entities.horario import Horario
import time

class HorarioModel(db.Model):
    __tablename__ = "horarios"

    id: Mapped[str] = mapped_column(String(9), primary_key=True)
    hora_fim: Mapped[str] = mapped_column(String(50), nullable=False)
    hora_inicio: Mapped[str] = mapped_column(String(50), nullable=False)
    dia_semana: Mapped[str] = mapped_column(String(20), nullable=False)
    

    def to_entity(self) -> Horario:
        return Horario(
            id=self.id,
            hora_fim=self.hora_fim,
            hora_inicio=self.hora_inicio,
            dia_semana=self.dia_semana,
        )

    @staticmethod
    def from_entity(entity: Horario):
        return HorarioModel(
            id=entity.id,
            hora_fim=entity.hora_fim,
            hora_inicio=entity.hora_inicio,
            dia_semana=entity.dia_semana,
        )