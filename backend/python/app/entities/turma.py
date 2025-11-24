
class Turma:
    def __init__(
            self, 
            id: int,
            codigoDisc: str,
            nome: str,
            ano: int,
            semestre: int,
            horarios_id: str,
        ):

      

        self.id = id,
        self.codigoDisc = codigoDisc,
        self.nome= nome,
        self.ano= ano,
        self.semestre= semestre,
        self.horarios_id = horarios_id

    def __repr__(self):
        return f"<Turma {self.id} - {self.codigoDisc} - {self.horarios_id}>"