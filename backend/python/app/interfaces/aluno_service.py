from abc import ABC, abstractmethod
from ..entities.aluno import Aluno

class IAlunoService(ABC):
    @abstractmethod
    def create_aluno(self, aluno: Aluno) -> Aluno:
        pass

    @abstractmethod
    def get_aluno(self, matricula: str) -> Aluno | None:
        pass

    @abstractmethod
    def list_alunos(self) -> list[Aluno]:
        pass

    @abstractmethod
    def update_aluno(self, matricula: str, dados: dict) -> Aluno | None:
        pass

    @abstractmethod
    def delete_aluno(self, matricula: str) -> bool:
        pass
