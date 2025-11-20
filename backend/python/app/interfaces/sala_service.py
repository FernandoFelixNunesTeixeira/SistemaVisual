from abc import ABC, abstractmethod
from ..entities.sala import Sala

class ISalaService(ABC):
    @abstractmethod
    def create_sala(self, sala: Sala) -> Sala:
        pass

    @abstractmethod
    def get_sala(self, id: int) -> Sala | None:
        pass

    @abstractmethod
    def list_salas(self) -> list[Sala]:
        pass

    @abstractmethod
    def update_sala(self, id: int, nomeSala: str) -> Sala | None:
        pass

    @abstractmethod
    def delete_sala(self, id: int) -> bool:
        pass
