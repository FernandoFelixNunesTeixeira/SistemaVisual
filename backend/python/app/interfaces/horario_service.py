from abc import ABC, abstractmethod
from ..entities.horario import Horario

class IHorarioService(ABC):
    @abstractmethod
    def create_horario(self, horario: Horario) -> Horario:
        pass

    @abstractmethod
    def get_horario(self, id: str) -> Horario | None:
        pass

    @abstractmethod
    def list_horarios(self) -> list[Horario]:
        pass

    @abstractmethod
    def update_horario(self, id: str, dados: dict) -> Horario | None:
        pass

    @abstractmethod
    def delete_horario(self, id: str) -> bool:
        pass