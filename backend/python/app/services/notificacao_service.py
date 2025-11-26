from ..interfaces.notificacao_service import INotificacaoService
from ..interfaces.notificacao_repository import INotificacaoRepository
from ..entities.notificacao import Notificacao 
from ..models.notificacao_model import NotificacaoModel
from dataclasses import asdict
from ..infrastructure.redis.event_bus_redis import RedisEventBus
# Falta turma, ler INotificacaoService

class NotificacaoNotFoundError(Exception):
    pass

class NotificacaoService(INotificacaoService):
    def __init__(self, repo: INotificacaoRepository, event_bus): # ,turma_repo
        self.repo = repo
        self.event_bus = event_bus
        #self.turma_repo = turma_repo

    def create_notificacao(self, entity: Notificacao):
        model = NotificacaoModel.from_entity(entity)
        self.repo.save(model)
        return model.to_entity()

    def find_turma(self, nome_sala, occurred_at):
        #turma = self.turma_repo.find_by_sala_and_time(nome_sala, timestamp)
        #if turma is None:
        #    raise ValueError("Nenhuma turma encontrada para essa sala e horário.")
        #return turma
        return 1
    
    def process_notificacao(self, entity: Notificacao):
        turmas_id = self.find_turma(entity.nome_sala, entity.occurred_at)

        model = NotificacaoModel.from_entity(entity)
        model.turmas_id = turmas_id # APENAAS PARA TESTE

        saved = self.repo.create(model)

        self.event_bus.publish({
            "id": str(saved.id),
            "sala": saved.nome_sala,
            "ocorrida_em": saved.occurred_at.isoformat()
        })

        return saved

    def get_notificacao(self, id: int) -> Notificacao:
        notificacao = self.repo.get_by_id(id)
        if not notificacao:
            raise NotificacaoNotFoundError(f"Notificacao com id '{id}' não encontrado.")
        return notificacao

    def list_notificacoes(self) -> list[Notificacao]:
        lista = self.repo.list_all()
        if lista is None:
            raise RuntimeError("Erro: list_all() retornou None.")
        return lista

    def update_notificacao(self, id: int, dados: dict) -> Notificacao:
        notificacao = self.repo.get_by_id(id)
        if not notificacao:
            raise NotificacaoNotFoundError(f"Notificacao com id '{id}' não encontrado para atualização.")

        if not isinstance(dados, dict):
            dados = asdict(dados)

        for campo, valor in dados.items():
            if hasattr(notificacao, campo):
                setattr(notificacao, campo, valor)

        atualizado = self.repo.update(notificacao)
        if not atualizado:
            raise RuntimeError("Falha ao atualizar a notificacao.")

        return atualizado

    def delete_notificacao(self, id: int) -> bool:
        notificacao = self.repo.get_by_id(id)
        if not notificacao:
            raise NotificacaoNotFoundError(f"Notificacao com id '{id}' não encontrado para exclusão.")

        self.repo.delete(id)
        return True
