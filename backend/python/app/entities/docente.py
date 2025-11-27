class Docente:
    def __init__(
            self, 
            matricula: str,
            nome: str, 
            email: str,
            coordenador: int,
            senha: str | None = None,
            senha_hashed: str | None = None,
            telefone: str | None = None,
            foto: str | None = None,
        ):

        self.matricula = matricula
        self.nome = nome
        self.email = email
        self.telefone = telefone
        self.foto = foto
        self.coordenador = coordenador
        self.senha_hashed = senha_hashed 
        self.senha = senha


    def __repr__(self):
        return f"<Docente {self.matricula} - {self.nome}>"