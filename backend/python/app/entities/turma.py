
class Turma:
    def __init__(
            self, 
            codigoDisc: str,
            nome: str,
            ano: int,
            semestre: int,
            id: int | None = None,
            horarios_id: str | None = None,
        ):

        self.codigoDisc = codigoDisc
        self.nome= nome
        self.ano= ano
        self.semestre= semestre
        self.horarios_id = horarios_id
        self.id = id

    def __repr__(self):
        return f"<Turma {self.id} - {self.codigoDisc} - {self.horarios_id}>"