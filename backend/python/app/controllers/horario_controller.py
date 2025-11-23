from flask import Blueprint, request, jsonify
from ..services.horario_service import HorarioService
from ..repositories.horario_repository import HorarioRepository
from ..schemas.horario_schema import CreateHorarioRequest, HorarioResponse
from ..DTOs.horario_dto import HorarioDTO
from flasgger import swag_from

horario_bp = Blueprint("horarios", __name__)
horario_service = HorarioService(HorarioRepository())

@horario_bp.post("/")
@swag_from('docs/horario/horario_create.yml')
def criar_horario():
    data = request.get_json()
    schema = CreateHorarioRequest(**data)

    dto = HorarioDTO(
        id=schema.id,
        hora_fim=schema.hora_fim,
        hora_inicio=schema.hora_inicio,
        dia_semana=schema.dia_semana
    )
    horario = horario_service.create_horario(dto)
    return jsonify(HorarioResponse(**horario.__dict__).model_dump()), 201


@horario_bp.get("/")
@swag_from('docs/horario/horario_list.yml')
def listar_horarios():
    horarios = horario_service.list_horarios()
    resposta = [HorarioResponse(**a.__dict__).model_dump() for a in horarios]
    return jsonify(resposta), 200

@horario_bp.get("/<string:id>")
@swag_from('docs/horario/horario_search.yml')
def buscar_por_matricula(id: str):
    horario = horario_service.get_horario(id)
    return jsonify(HorarioResponse(**horario.__dict__).model_dump()), 200

@horario_bp.put("/<string:id>")
@swag_from('docs/horario/horario_update.yml')
def atualizar_horario(id: str):
    data = request.get_json()
    schema = CreateHorarioRequest(**data)

    dto = HorarioDTO(
        id=schema.id,
        hora_fim=schema.hora_fim,
        hora_inicio=schema.hora_inicio,
        dia_semana=schema.dia_semana
    )
    horario = horario_service.update_horario(id, dto)
    return jsonify(HorarioResponse(**horario.__dict__).model_dump()), 200


@horario_bp.delete("/<string:id>")
@swag_from('docs/horario/horario_delete.yml')
def deletar_horario(id: str):
    horario_service.delete_horario(id)
    return jsonify({"detail": "Horário removido com sucesso"}), 200