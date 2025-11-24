from abc import ABC, abstractmethod
from ..entities import Docente

class IDocenteService(ABC):
    @abstractmethod
    def create_docente(self, docente: Docente) -> Docente:
        pass

    @abstractmethod
    def get_docente(self, matricula: str) -> Docente | None:
        pass

    @abstractmethod
    def list_docentes(self) -> list[Docente]:
        pass

    @abstractmethod
    def update_docente(self, matricula: str, dados: dict) -> Docente | None:
        pass

    @abstractmethod
    def delete_docente(self, matricula: str) -> bool:
        pass
