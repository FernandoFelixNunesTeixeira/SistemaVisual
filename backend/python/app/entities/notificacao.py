from datetime import datetime

class Notificacao:
    def __init__(
            self, 
            occurred_at: datetime, 
            nome_sala: str,
            id: int | None = None,
            porcentagem: float | None = None,
            turmas_id: int | None = None,
        ):

        self.id = id
        self.occurred_at = occurred_at
        self.nome_sala = nome_sala
        self.porcentagem = porcentagem
        self.turmas_id = turmas_id

    def __repr__(self):
        return f"<Notificacao {self.id}>"
