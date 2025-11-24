from ..interfaces.docente_repository import IDocenteRepository
from ..infrastructure.database.db import db
from ..models.docente_model import DocenteModel
from ..entities import Docente

class DocenteRepository(IDocenteRepository):

    def get_by_matricula(self, matricula: str) -> Docente | None:
        model = DocenteModel.query.get(matricula)
        if model:
            return model.to_entity() 
        else:
            return None

    def create(self, docente: Docente) -> Docente:
        model = DocenteModel(
            matricula=docente.matricula,
            nome=docente.nome,
            email=docente.email,
            telefone=docente.telefone,
            foto=docente.foto,
            coordenador=docente.coordenador,
        )
        db.session.add(model)
        db.session.commit()
        return model.to_entity()

    def list_all(self) -> list[Docente]:
        return [m.to_entity() for m in DocenteModel.query.all()]

    def update(self, docente: Docente) -> Docente:
        model = DocenteModel.query.get(docente.matricula)
        if not model:
            return None

        model.nome = docente.nome
        model.telefone = docente.telefone
        model.email = docente.email
        model.foto = docente.foto
        model.coordenador = docente.coordenador

        db.session.commit()
        return model.to_entity()

    def delete(self, matricula: str) -> None:
        model = DocenteModel.query.get(matricula)
        if model:
            db.session.delete(model)
            db.session.commit()