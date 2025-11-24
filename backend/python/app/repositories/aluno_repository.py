from ..interfaces.aluno_repository import IAlunoRepository
from ..infrastructure.database.db import db
from ..models.aluno_model import AlunoModel
from ..entities import Aluno

class AlunoRepository(IAlunoRepository):

    def get_by_matricula(self, matricula: str) -> Aluno | None:
        model = AlunoModel.query.get(matricula)
        if model:
            return model.to_entity() 
        else:
            return None

    def create(self, aluno: Aluno) -> Aluno:
        model = AlunoModel(
            matricula=aluno.matricula,
            nome=aluno.nome,
            email=aluno.email,
            telefone=aluno.telefone,
            periodo_de_referencia=aluno.periodo_de_referencia,
            foto=aluno.foto,
        )
        db.session.add(model)
        db.session.commit()
        return model.to_entity()

    def list_all(self) -> list[Aluno]:
        return [m.to_entity() for m in AlunoModel.query.all()]

    def update(self, aluno: Aluno) -> Aluno:
        model = AlunoModel.query.get(aluno.matricula)
        if not model:
            return None

        model.nome = aluno.nome
        model.telefone = aluno.telefone
        model.email = aluno.email
        model.periodo_de_referencia = aluno.periodo_de_referencia
        model.foto = aluno.foto

        db.session.commit()
        return model.to_entity()

    def delete(self, matricula: str) -> None:
        model = AlunoModel.query.get(matricula)
        if model:
            db.session.delete(model)
            db.session.commit()
