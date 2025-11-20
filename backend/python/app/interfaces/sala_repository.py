from abc import ABC, abstractmethod
from ..entities import Sala

class ISalaRepository(ABC):

    @abstractmethod
    def get_by_numero(self, id: int) -> Sala | None:
        pass

    @abstractmethod
    def create(self, sala: Sala) -> Sala:
        pass

    @abstractmethod
    def list_all(self) -> list[Sala]:
        pass

    @abstractmethod
    def update(self, sala: Sala) -> Sala:
        pass

    @abstractmethod
    def delete(self, id: int) -> None:
        pass
