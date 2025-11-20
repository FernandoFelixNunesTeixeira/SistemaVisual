from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String
from ..infrastructure.database.db import db
from ..entities.sala import Sala

class SalaModel(db.Model):
    __tablename__ = "sala"

    nomeSala: Mapped[str] = mapped_column(String(50))
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    

    def to_entity(self) -> Sala:
        return Sala(
            nomeSala=self.nomeSala,
            id=self.id,
        )

    @staticmethod
    def from_entity(entity: Sala):
        return SalaModel(
            nomeSala=entity.nomeSala,
            id=entity.id,
        )