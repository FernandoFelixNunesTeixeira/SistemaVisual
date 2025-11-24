from abc import ABC, abstractmethod
from ..entities.turma import Turma

class ITurmaService(ABC):
    @abstractmethod
    def create_turma(self, turma: Turma) -> Turma:
        pass

    @abstractmethod
    def get_turma(self, id: int) -> Turma | None:
        pass

    @abstractmethod
    def list_turmas(self) -> list[Turma]:
        pass

    @abstractmethod
    def update_turma(self, id: int, dados: dict) -> Turma | None:
        pass

    @abstractmethod
    def delete_turma(self, id: int) -> bool:
        pass