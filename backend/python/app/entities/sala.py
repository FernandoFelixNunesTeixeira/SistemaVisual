class Sala:
    def __init__(
            self, 
            nome_sala: str,
            id: int
        ):

        self.nome_sala = nome_sala
        self.id = id

    def __repr__(self):
        return f"<Sala {self.nome_sala}>"
