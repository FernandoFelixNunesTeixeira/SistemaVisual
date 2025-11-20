class Sala:
    def __init__(
            self, 
            nomeSala: str,
            id: int
        ):

        self.nomeSala = nomeSala
        self.id = id

    def __repr__(self):
        return f"<Sala {self.nomeSala}>"
