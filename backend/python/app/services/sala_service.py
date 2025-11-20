from ..DTOs.sala_dto import SalaDTO
from ..interfaces.sala_service import ISalaService
from ..interfaces.sala_repository import ISalaRepository
from ..entities.sala import Sala

class SalaNotFoundError(Exception):
    pass


class SalaAlreadyExistsError(Exception):
    pass


class InvalidSalaDataError(Exception):
    pass

class SalaService(ISalaService):
    def __init__(self, repo: ISalaRepository):
        self.repo = repo

    def create_sala(self, sala: Sala) -> Sala:
        if not sala.nomeSala or sala.nomeSala.strip() == "":
            raise InvalidSalaDataError("Nome é obrigatório.")

        return self.repo.create(sala)

    def get_sala(self, id: int) -> Sala:
        sala = self.repo.get_by_numero(id)
        if not sala:
            raise SalaNotFoundError(f"Sala com número '{id}' não encontrado.")
        return sala

    def list_salas(self) -> list[Sala]:
        lista = self.repo.list_all()
        if lista is None:
            raise RuntimeError("Erro: list_all() retornou None.")
        return lista

    def update_sala(self, id: int, dados: SalaDTO) -> Sala:
        sala = self.repo.get_by_numero(id)
        
        if not sala:
            raise SalaNotFoundError(f"Sala com número '{id}' não encontrado para atualização.")

        # Atualiza campos individuais
        if dados.nomeSala is not None:
            sala.nomeSala = dados.nomeSala

        atualizado = self.repo.update(sala)
        if not atualizado:
            raise RuntimeError("Falha ao atualizar a sala.")

        return atualizado


    def delete_sala(self, id: int) -> bool:
        sala = self.repo.get_by_numero(id)
        if not sala:
            raise SalaNotFoundError(f"Sala com número '{id}' não encontrado para exclusão.")

        self.repo.delete(id)
        return True
