class Aluno:
    def __init__(
            self, 
            matricula: str,
            nome: str, 
            periodo_de_referencia: str,
            email: str,
            telefone: str | None = None,
            foto: str | None = None,
        ):

        self.matricula = matricula
        self.nome = nome
        self.telefone = telefone
        self.email = email
        self.periodo_de_referencia = periodo_de_referencia
        self.foto = foto

    def __repr__(self):
        return f"<Aluno {self.matricula} - {self.nome}>"
