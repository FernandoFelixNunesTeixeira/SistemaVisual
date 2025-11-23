import time

class Horario:
    def __init__(
            self, 
            id: str,
            hora_inicio: time, 
            hora_fim: time,
            dia_semana: str,
        ):

        self.id = id
        self.hora_inicio = hora_inicio
        self.hora_fim = hora_fim
        self.dia_semana = dia_semana

    def __repr__(self):
        return f"<Horario {self.id} - {self.dia_semana}>"