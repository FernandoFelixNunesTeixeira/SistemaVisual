from abc import ABC, abstractmethod
from ..entities import Turma

class ITurmaRepository(ABC):

    @abstractmethod
    def get_by_id(self, id: int) -> Turma | None:
        pass

    @abstractmethod
    def create(self, turma: Turma) -> Turma:
        pass

    @abstractmethod
    def list_all(self) -> list[Turma]:
        pass

    @abstractmethod
    def update(self, turma: Turma) -> Turma:
        pass

    @abstractmethod
    def delete(self, id: int) -> None:
        pass