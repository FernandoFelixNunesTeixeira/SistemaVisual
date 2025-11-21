from abc import ABC, abstractmethod
from ..entities import Notificacao

class INotificacaoRepository(ABC):

    @abstractmethod
    def get_by_id(self, id: int) -> Notificacao | None:
        pass

    @abstractmethod
    def create(self, notificacao: Notificacao) -> Notificacao:
        pass

    @abstractmethod
    def list_all(self) -> list[Notificacao]:
        pass

    @abstractmethod
    def update(self, notificacao: Notificacao) -> Notificacao:
        pass

    @abstractmethod
    def delete(self, id: int) -> None:
        pass
