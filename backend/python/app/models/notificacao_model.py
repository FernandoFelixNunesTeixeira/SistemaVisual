from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Float, Integer, DateTime
from ..infrastructure.database.db import db
from ..entities.notificacao import Notificacao

class NotificacaoModel(db.Model):
    __tablename__ = "notificacoes"

    id: Mapped[int] = mapped_column(db.BigInteger, primary_key=True, autoincrement=True)
    occurred_at: Mapped[DateTime] = mapped_column(DateTime, server_default=db.func.now())
    porcentagem: Mapped[float] = mapped_column(Float, nullable=True)
    # TODO: Revisar fk e ver se não falta algo, confirmar se SET NULL para delete está bom ou n
    #turmas_id: Mapped[int] = mapped_column(Integer, db.ForeignKey("turmas.id", ondelete="SET NULL"))
    turmas_id: Mapped[int] = mapped_column(Integer, nullable=True)  # sem ForeignKey para teste
    
    def to_entity(self) -> Notificacao:
        return Notificacao(
            id=self.id,
            occurred_at=self.occurred_at,
            nome_sala=None, # Sala não é armazenado no BD. É usado para encontrar turma no service
            turmas_id=self.turmas_id,
            porcentagem=self.porcentagem
        )

    @staticmethod
    def from_entity(entity: Notificacao):
        return NotificacaoModel(
            id=getattr(entity, "id", None),
            occurred_at=entity.occurred_at,
            porcentagem=entity.porcentagem,
            turmas_id=None  # turmas_id é encontrado com base em sala e horario pelo service
        )
