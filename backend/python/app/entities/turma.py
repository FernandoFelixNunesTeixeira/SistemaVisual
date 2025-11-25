
class Turma:
    def __init__(
            self, 
            codigo_disc: str,
            nome: str,
            ano: int,
            semestre: int,
            id: int | None = None,
            horarios_id: str | None = None,
        ):

        self.codigo_disc = codigo_disc
        self.nome= nome
        self.ano= ano
        self.semestre= semestre
        self.horarios_id = horarios_id
        self.id = id

    def __repr__(self):
        return f"<Turma {self.id} - {self.codigo_disc} - {self.horarios_id}>"