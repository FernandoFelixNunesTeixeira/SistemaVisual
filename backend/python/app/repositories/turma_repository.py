from ..interfaces.turma_repository import ITurmaRepository
from ..infrastructure.database.db import db
from ..models.turma_model import TurmaModel
from ..entities import Turma

class TurmaRepository(ITurmaRepository):

    def get_by_id(self, id: int) -> Turma | None:
        model = TurmaModel.query.get(id)
        if model:
            return model.to_entity() 
        else:
            return None

    def create(self, turma: Turma) -> Turma:
        model = TurmaModel(
            id=turma.id,
            codigoDisc=turma.codigoDisc,
            nome=turma.nome,
            ano=turma.ano,
            semestre = turma.semestre,
            horarios_id = turma.horarios_id,
        )
        db.session.add(model)
        db.session.commit()
        return model.to_entity()

    def list_all(self) -> list[Turma]:
        return [m.to_entity() for m in TurmaModel.query.all()]

    def update(self,  turma: Turma) -> Turma:
        model = TurmaModel.query.get(turma.id)
        if not model:
            return None

        model.codigoDisc=turma.codigoDisc,
        model.nome=turma.nome,
        model.ano=turma.ano,
        model.semestre = turma.semestre,
        model.horarios_id = turma.horarios_id,
      

        db.session.commit()
        return model.to_entity()

    def delete(self, id: int) -> None:
        model = TurmaModel.query.get(id)
        if model:
            db.session.delete(model)
            db.session.commit()
