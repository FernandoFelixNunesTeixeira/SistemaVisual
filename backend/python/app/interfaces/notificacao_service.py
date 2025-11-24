from abc import ABC, abstractmethod
from datetime import datetime
from ..entities import Notificacao #, Turma
#TODO !!IMPORTANTE!!: Esperando por Turma.
#get_turma irá com base no nome da sala e no horario encontrar a turma do ocorrido e retornar uma Turma Entity
#por enquanto to usando para teste um mock que retorna um id de turma imaginario

class INotificacaoService(ABC):
    @abstractmethod
    def create_notificacao(self, notificacao: Notificacao) -> Notificacao:
        pass

    @abstractmethod
    def get_notificacao(self, id: int) -> Notificacao | None:
        pass

    @abstractmethod
    def find_turma(self, nome_sala: str, occurred_at: datetime) -> int: # TROCAR POR -> Turma (Entidade)
        pass

    def process_notificacao(self, entity: Notificacao) -> Notificacao:
        pass

    @abstractmethod
    def list_notificacoes(self) -> list[Notificacao]:
        pass

    @abstractmethod
    def update_notificacao(self, id: int, dados: dict) -> Notificacao | None:
        pass

    @abstractmethod
    def delete_notificacao(self, id: int) -> bool:
        pass
