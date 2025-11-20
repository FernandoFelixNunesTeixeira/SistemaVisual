from ..interfaces.sala_repository import ISalaRepository
from ..infrastructure.database.db import db
from ..models.sala_model import SalaModel
from ..entities import Sala

class SalaRepository(ISalaRepository):

    def get_by_numero(self, id: str) -> Sala | None:
        model = SalaModel.query.get(id)
        if model:
            return model.to_entity() 
        else:
            return None

    def create(self, sala: Sala) -> Sala:
        model = SalaModel(
            id=sala.id,
            nomeSala=sala.nomeSala
        )
        db.session.add(model)
        db.session.commit()
        return model.to_entity()

    def list_all(self) -> list[Sala]:
        return [m.to_entity() for m in SalaModel.query.all()]

    def update(self, sala: Sala) -> Sala:
        model = SalaModel.query.get(sala.id)
        if not model:
            return None

        model.nomeSala = sala.nomeSala

        db.session.commit()
        return model.to_entity()

    def delete(self, id: str) -> None:
        model = SalaModel.query.get(id)
        if model:
            db.session.delete(model)
            db.session.commit()
