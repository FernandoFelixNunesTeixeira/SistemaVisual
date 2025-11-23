from ..interfaces.horario_repository import IHorarioRepository
from ..infrastructure.database.db import db
from ..models.horario_model import HorarioModel
from ..entities import Horario

class HorarioRepository(IHorarioRepository):

    def get_by_id(self, id: str) -> Horario | None:
        model = HorarioModel.query.get(id)
        if model:
            return model.to_entity() 
        else:
            return None

    def create(self, horario: Horario) -> Horario:
        model = HorarioModel(
            id=horario.id,
            hora_fim=horario.hora_fim,
            hora_inicio=horario.hora_inicio,
            dia_semana=horario.dia_semana,
        )
        db.session.add(model)
        db.session.commit()
        return model.to_entity()

    def list_all(self) -> list[Horario]:
        return [m.to_entity() for m in HorarioModel.query.all()]

    def update(self,  horario: Horario) -> Horario:
        model = HorarioModel.query.get(horario.id)
        if not model:
            return None

        model.hora_fim = horario.hora_fim
        model.hora_inicio = horario.hora_inicio
        model.dia_semana = horario.dia_semana
      

        db.session.commit()
        return model.to_entity()

    def delete(self, id: str) -> None:
        model = HorarioModel.query.get(id)
        if model:
            db.session.delete(model)
            db.session.commit()
