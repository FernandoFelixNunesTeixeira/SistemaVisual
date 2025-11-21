from ..interfaces.notificacao_repository import INotificacaoRepository
from ..infrastructure.database.db import db
from ..models.notificacao_model import NotificacaoModel
from ..entities import Notificacao

class NotificacaoRepository(INotificacaoRepository):

    def get_by_id(self, id: int) -> Notificacao | None:
        model = NotificacaoModel.query.get(id)
        if model:
            return model.to_entity() 
        else:
            return None

    def create(self, notificacao: Notificacao) -> Notificacao:
        model = NotificacaoModel(
            occurred_at=notificacao.occurred_at,
            porcentagem=notificacao.porcentagem,
            turmas_id=notificacao.turmas_id,
        )
        db.session.add(model)
        db.session.commit()
        db.session.refresh(model) # Garante que SQLAlchemy receba Id gerado automaticamente
        return model.to_entity()

    def list_all(self) -> list[Notificacao]:
        return [m.to_entity() for m in NotificacaoModel.query.all()]

    def update(self, notificacao: Notificacao) -> Notificacao:
        model = NotificacaoModel.query.get(notificacao.id)
        if not model:
            return None

        model.id = notificacao.id
        model.occurred_at = notificacao.occurred_at
        model.porcentagem = notificacao.porcentagem
        model.turmas_id = notificacao.turmas_id

        db.session.commit()
        return model.to_entity()

    def delete(self, id: int) -> None:
        model = NotificacaoModel.query.get(id)
        if model:
            db.session.delete(model)
            db.session.commit()
