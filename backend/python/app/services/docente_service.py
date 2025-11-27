from ..interfaces.docente_service import IDocenteService
from ..interfaces.docente_repository import IDocenteRepository
from ..entities.docente import Docente
from dataclasses import asdict
from ..infrastructure.security.extensoes import bcrypt

class DocenteNotFoundError(Exception):
    pass

class DocenteAlreadyExistsError(Exception):
    pass


class InvalidDocenteDataError(Exception):
    pass

class DocenteService(IDocenteService):
    def __init__(self, repo: IDocenteRepository = None):
        if repo is None:
            from app.repositories.docente_repository import DocenteRepository
            self.repo = DocenteRepository()
        else:
            self.repo = repo

            
    def create_docente(self, docente: Docente) -> Docente:
        if not docente.matricula or docente.matricula.strip() == "":
            raise InvalidDocenteDataError("Matrícula é obrigatória.")

        if not docente.nome or docente.nome.strip() == "":
            raise InvalidDocenteDataError("Nome é obrigatório.")

        existente = self.repo.get_by_matricula(docente.matricula)
        if existente:
            raise DocenteAlreadyExistsError(f"Já existe um docente com a matrícula '{docente.matricula}'.")

        docente.senha_hashed = bcrypt.generate_password_hash(docente.senha).decode('utf-8')

        return self.repo.create(docente)

    def get_docente(self, matricula: str) -> Docente:
        docente = self.repo.get_by_matricula(matricula)
        if not docente:
            raise DocenteNotFoundError(f"Docente com matrícula '{matricula}' não encontrado.")
        return docente

    def get_docente_by_email(self, email: str) -> Docente:
        email = self.repo.get_by_email(email)
        if not email:
            raise DocenteNotFoundError(f"Docente com email '{email}' não encontrado.")
        return email

    def list_docentes(self) -> list[Docente]:
        lista = self.repo.list_all()
        if lista is None:
            raise RuntimeError("Erro: list_all() retornou None.")
        return lista

    def update_docente(self, matricula: str, dados: dict) -> Docente:
        docente = self.repo.get_by_matricula(matricula)
        if not docente:
            raise DocenteNotFoundError(f"Docente com matrícula '{matricula}' não encontrado para atualização.")

        if not isinstance(dados, dict):
            dados = asdict(dados)

        for campo, valor in dados.items():
            if hasattr(docente, campo):
                setattr(docente, campo, valor)

        atualizado = self.repo.update(docente)
        if not atualizado:
            raise RuntimeError("Falha ao atualizar o docente.")

        return atualizado

    def delete_docente(self, matricula: str) -> bool:
        docente = self.repo.get_by_matricula(matricula)
        if not docente:
            raise DocenteNotFoundError(f"Docente com matrícula '{matricula}' não encontrado para exclusão.")

        self.repo.delete(matricula)
        return True