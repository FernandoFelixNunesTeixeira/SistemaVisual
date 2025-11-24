from ..interfaces.turma_service import ITurmaService
from ..interfaces.turma_repository import ITurmaRepository
from ..entities.turma import Turma
from dataclasses import asdict


class TurmaNotFoundError(Exception):
    pass


class TurmaAlreadyExistsError(Exception):
    pass


class InvalidTurmaDataError(Exception):
    pass

class TurmaService(ITurmaService):
    def __init__(self, repo: ITurmaRepository):
        self.repo = repo

    def create_turma(self, turma: Turma) -> Turma:
        if not turma.codigoDisc or turma.codigoDisc.strip() == "":
            raise InvalidTurmaDataError("Código da disciplina é obrigatório.")
        
        if not turma.ano:
            raise InvalidTurmaDataError("Ano da disciplina é obrigatório.")
        
        if not turma.horarios_id or turma.horarios_id.strip() == "":
            raise InvalidTurmaDataError("id do horário associado a disciplina é obrigatório.")

        return self.repo.create(turma)

    def get_turma(self, id: int) -> Turma:
        turma = self.repo.get_by_id(id)
        if not turma:
            raise TurmaNotFoundError(f"Turma com id '{id}' não encontrado.")
        return turma

    def list_turmas(self) -> list[Turma]:
        lista = self.repo.list_all()
        if lista is None:
            raise RuntimeError("Erro: list_all() retornou None.")
        return lista

    def update_turma(self, id: int, dados: dict) -> Turma:
        turma = self.repo.get_by_id(id)
        if not turma:
            raise TurmaNotFoundError(f"Turma com id'{id}' não encontrado para atualização.")

        if not isinstance(dados, dict):
            dados = asdict(dados)

        for campo, valor in dados.items():
            if hasattr(turma, campo):
                setattr(turma, campo, valor)

        atualizado = self.repo.update(turma)
        if not atualizado:
            raise RuntimeError("Falha ao atualizar a turma.")

        return atualizado

    def delete_turma(self, id: int) -> bool:
        turma = self.repo.get_by_id(id)
        if not turma:
            raise TurmaNotFoundError(f"Turma com id '{id}' não encontrado para exclusão.")

        self.repo.delete(id)
        return True