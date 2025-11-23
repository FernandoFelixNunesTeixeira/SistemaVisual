from ..interfaces.horario_service import IHorarioService
from ..interfaces.horario_repository import IHorarioRepository
from ..entities.horario import Horario
from dataclasses import asdict

class HorarioNotFoundError(Exception):
    pass


class HorarioAlreadyExistsError(Exception):
    pass


class InvalidHorarioDataError(Exception):
    pass

class HorarioService(IHorarioService):
    def __init__(self, repo: IHorarioRepository):
        self.repo = repo

    def create_horario(self, horario: Horario) -> Horario:
        if not horario.id or horario.id.strip() == "":
            raise InvalidHorarioDataError("id é obrigatório.")

        if not horario.hora_fim or horario.hora_fim.strip() == "":
            raise InvalidHorarioDataError("hora de fim é obrigatório")
        
        if not horario.hora_inicio or horario.hora_inicio.strip() == "":
            raise InvalidHorarioDataError("hora de início é obrigatório")
        
        if not horario.dia_semana or horario.dia_semana.strip() == "":
            raise InvalidHorarioDataError("dia da semana é obrigatório")
        
        if horario.hora_inicio > horario.hora_fim:
            raise InvalidHorarioDataError("hora de início tem que ser menor que hora de fim")

        existente = self.repo.get_by_matricula(horario.matricula)
        if existente:
            raise HorarioAlreadyExistsError(f"Já existe um horário com a matrícula '{horario.matricula}'.")

        return self.repo.create(horario)

    def get_horario(self, id: str) -> Horario:
        horario = self.repo.get_by_matricula(id)
        if not horario:
            raise HorarioNotFoundError(f"Horario com id '{id}' não encontrado.")
        return horario

    def list_horarios(self) -> list[Horario]:
        lista = self.repo.list_all()
        if lista is None:
            raise RuntimeError("Erro: list_all() retornou None.")
        return lista

    def update_horario(self, id: str, dados: dict) -> Horario:
        horario = self.repo.get_by_id(id)
        if not horario:
            raise HorarioNotFoundError(f"Horário com id'{id}' não encontrado para atualização.")

        if not isinstance(dados, dict):
            dados = asdict(dados)

        for campo, valor in dados.items():
            if hasattr(horario, campo):
                setattr(horario, campo, valor)

        atualizado = self.repo.update(horario)
        if not atualizado:
            raise RuntimeError("Falha ao atualizar o horário.")

        return atualizado

    def delete_horario(self, id: str) -> bool:
        horario = self.repo.get_by_matricula(id)
        if not horario:
            raise HorarioNotFoundError(f"Horario com id '{id}' não encontrado para exclusão.")

        self.repo.delete(id)
        return True
