from flask import Blueprint, request, jsonify
from ..services.sala_service import SalaService
from ..repositories.sala_repository import SalaRepository
from ..schemas.sala_schema import CreateSalaRequest, SalaResponse
from ..DTOs.sala_dto import SalaDTO
from flasgger import swag_from

sala_bp = Blueprint("salas", __name__)
sala_service = SalaService(SalaRepository())


@sala_bp.post("/")
@swag_from('docs/sala/sala_create.yml')
def criar_sala():
    data = request.get_json()
    schema = CreateSalaRequest(**data)
    dto = SalaDTO(
        nomeSala=schema.nomeSala,
    )
    sala = sala_service.create_sala(dto)
    return jsonify(SalaResponse(**sala.__dict__).model_dump()), 201

@sala_bp.get("/")
@swag_from('docs/sala/sala_list.yml')
def listar_salas():
    salas = sala_service.list_salas()
    resposta = [SalaResponse(**a.__dict__).model_dump() for a in salas]
    return jsonify(resposta), 200

@sala_bp.get("/<int:id>")
@swag_from('docs/sala/sala_search.yml')
def buscar_por_id(id: int):
    sala = sala_service.get_sala(id)
    return jsonify(SalaResponse(**sala.__dict__).model_dump()), 200

@sala_bp.put("/<int:id>")
@swag_from('docs/sala/sala_update.yml')
def atualizar_sala(id: int):
    data = request.get_json()
    schema = CreateSalaRequest(**data)

    dto = SalaDTO(
        nomeSala=schema.nomeSala,
        id=id,
    )
    sala = sala_service.update_sala(id, dto)
    return jsonify(SalaResponse(**sala.__dict__).model_dump()), 200


@sala_bp.delete("/<int:id>")
@swag_from('docs/sala/sala_delete.yml')
def deletar_sala(id: int):
    sala_service.delete_sala(id)
    return jsonify({"detail": "Sala removido com sucesso"}), 200
