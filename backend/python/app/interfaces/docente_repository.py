from abc import ABC, abstractmethod
from ..entities import Docente

class IDocenteRepository(ABC):

    @abstractmethod
    def get_by_matricula(self, matricula: str) -> Docente | None:
        pass

    @abstractmethod
    def get_by_email(self, email: str) -> Docente | None:
        pass

    @abstractmethod
    def create(self, docente: Docente) -> Docente:
        pass

    @abstractmethod
    def list_all(self) -> list[Docente]:
        pass

    @abstractmethod
    def update(self, docente: Docente) -> Docente:
        pass

    @abstractmethod
    def delete(self, matricula: str) -> None:
        pass
