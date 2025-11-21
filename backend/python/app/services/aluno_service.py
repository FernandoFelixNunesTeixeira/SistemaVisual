from ..interfaces.aluno_service import IAlunoService
from ..interfaces.aluno_repository import IAlunoRepository
from ..entities.aluno import Aluno
from dataclasses import asdict

class AlunoNotFoundError(Exception):
    pass


class AlunoAlreadyExistsError(Exception):
    pass


class InvalidAlunoDataError(Exception):
    pass

class AlunoService(IAlunoService):
    def __init__(self, repo: IAlunoRepository):
        self.repo = repo

    def create_aluno(self, aluno: Aluno) -> Aluno:
        if not aluno.matricula or aluno.matricula.strip() == "":
            raise InvalidAlunoDataError("Matrícula é obrigatória.")

        if not aluno.nome or aluno.nome.strip() == "":
            raise InvalidAlunoDataError("Nome é obrigatório.")

        existente = self.repo.get_by_matricula(aluno.matricula)
        if existente:
            raise AlunoAlreadyExistsError(f"Já existe um aluno com a matrícula '{aluno.matricula}'.")

        return self.repo.create(aluno)

    def get_aluno(self, matricula: str) -> Aluno:
        aluno = self.repo.get_by_matricula(matricula)
        if not aluno:
            raise AlunoNotFoundError(f"Aluno com matrícula '{matricula}' não encontrado.")
        return aluno

    def list_alunos(self) -> list[Aluno]:
        lista = self.repo.list_all()
        if lista is None:
            raise RuntimeError("Erro: list_all() retornou None.")
        return lista

    def update_aluno(self, matricula: str, dados: dict) -> Aluno:
        aluno = self.repo.get_by_matricula(matricula)
        if not aluno:
            raise AlunoNotFoundError(f"Aluno com matrícula '{matricula}' não encontrado para atualização.")

        if not isinstance(dados, dict):
            dados = asdict(dados)

        for campo, valor in dados.items():
            if hasattr(aluno, campo):
                setattr(aluno, campo, valor)

        atualizado = self.repo.update(aluno)
        if not atualizado:
            raise RuntimeError("Falha ao atualizar o aluno.")

        return atualizado

    def delete_aluno(self, matricula: str) -> bool:
        aluno = self.repo.get_by_matricula(matricula)
        if not aluno:
            raise AlunoNotFoundError(f"Aluno com matrícula '{matricula}' não encontrado para exclusão.")

        self.repo.delete(matricula)
        return True
