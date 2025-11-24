from abc import ABC, abstractmethod
from ..entities import Horario

class IHorarioRepository(ABC):

    @abstractmethod
    def get_by_id(self, id: str) -> Horario | None:
        pass

    @abstractmethod
    def create(self, horario: Horario) -> Horario:
        pass

    @abstractmethod
    def list_all(self) -> list[Horario]:
        pass

    @abstractmethod
    def update(self, horario: Horario) -> Horario:
        pass

    @abstractmethod
    def delete(self, id: str) -> None:
        pass
