from abc import ABC, abstractmethod
from ..entities import Aluno

class IAlunoRepository(ABC):

    @abstractmethod
    def get_by_matricula(self, matricula: str) -> Aluno | None:
        pass

    @abstractmethod
    def create(self, aluno: Aluno) -> Aluno:
        pass

    @abstractmethod
    def list_all(self) -> list[Aluno]:
        pass

    @abstractmethod
    def update(self, aluno: Aluno) -> Aluno:
        pass

    @abstractmethod
    def delete(self, matricula: str) -> None:
        pass
