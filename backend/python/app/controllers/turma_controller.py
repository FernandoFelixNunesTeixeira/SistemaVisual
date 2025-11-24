from flask import Blueprint, request, jsonify
from ..services.turma_service import TurmaService
from ..repositories.turma_repository import TurmaRepository
from ..schemas.turma_schema import CreateTurmaRequest, TurmaResponse
from ..DTOs.turma_dto import CreateTurmaDTO, TurmaDTO
from flasgger import swag_from

turma_bp = Blueprint("turmas", __name__)
turma_service = TurmaService(TurmaRepository())

@turma_bp.post("/")
@swag_from('docs/turma/turma_create.yml')
def criar_turma():
    data = request.get_json()
    schema = CreateTurmaRequest(**data)

    dto = CreateTurmaDTO(
        codigoDisc = schema.codigoDisc,
        nome= schema.nome,
        ano= schema.ano,
        semestre= schema.semestre,
        horarios_id = schema.horarios_id
    )
    turma = turma_service.create_turma(dto)
    return jsonify(TurmaResponse(**turma.__dict__).model_dump()), 201


@turma_bp.get("/")
@swag_from('docs/turma/turma_list.yml')
def listar_turmas():
    turmas = turma_service.list_turmas()
    resposta = [TurmaResponse(**a.__dict__).model_dump() for a in turmas]
    return jsonify(resposta), 200

@turma_bp.get("/<int:id>")
@swag_from('docs/turma/turma_search.yml')
def buscar_por_id(id: int):
    turma = turma_service.get_turma(id)
    return jsonify(TurmaResponse(**turma.__dict__).model_dump()), 200

@turma_bp.put("/<int:id>")
@swag_from('docs/turma/turma_update.yml')
def atualizar_turma(id: int):
    data = request.get_json()
    schema = CreateTurmaRequest(**data)

    dto = CreateTurmaDTO(
        codigoDisc = schema.codigoDisc,
        nome= schema.nome,
        ano= schema.ano,
        semestre= schema.semestre,
        horarios_id = schema.horarios_id
    )
    turma = turma_service.update_turma(id, dto)
    return jsonify(TurmaResponse(**turma.__dict__).model_dump()), 200


@turma_bp.delete("/<int:id>")
@swag_from('docs/turma/turma_delete.yml')
def deletar_turma(id: int):
    turma_service.delete_turma(id)
    return jsonify({"detail": "Turma removida com sucesso"}), 200