from flask import Blueprint, request, jsonify
from ..services.aluno_service import AlunoService
from ..repositories.aluno_repository import AlunoRepository
from ..schemas.aluno_schema import CreateAlunoRequest, AlunoResponse
from ..DTOs.aluno_dto import AlunoDTO
from flasgger import swag_from

aluno_bp = Blueprint("alunos", __name__)
aluno_service = AlunoService(AlunoRepository())

@aluno_bp.post("/")
@swag_from('docs/aluno/aluno_create.yml')
def criar_aluno():
    data = request.get_json()
    schema = CreateAlunoRequest(**data)

    dto = AlunoDTO(
        nome=schema.nome,
        email=schema.email,
        telefone=schema.telefone,
        matricula=schema.matricula,
        periodo_de_referencia=schema.periodo_de_referencia,
        foto=None,
    )
    aluno = aluno_service.create_aluno(dto)
    return jsonify(AlunoResponse(**aluno.__dict__).model_dump()), 201


@aluno_bp.get("/")
@swag_from('docs/aluno/aluno_list.yml')
def listar_alunos():
    alunos = aluno_service.list_alunos()
    resposta = [AlunoResponse(**a.__dict__).model_dump() for a in alunos]
    return jsonify(resposta), 200

@aluno_bp.get("/<string:matricula>")
@swag_from('docs/aluno/aluno_search.yml')
def buscar_por_matricula(matricula: str):
    aluno = aluno_service.get_aluno(matricula)
    return jsonify(AlunoResponse(**aluno.__dict__).model_dump()), 200

@aluno_bp.put("/<string:matricula>")
@swag_from('docs/aluno/aluno_update.yml')
def atualizar_aluno(matricula: str):
    data = request.get_json()
    schema = CreateAlunoRequest(**data)

    dto = AlunoDTO(
        nome=schema.nome,
        email=schema.email,
        telefone=schema.telefone,
        matricula=schema.matricula,
        periodo_de_referencia=schema.periodo_de_referencia,
        foto=None,
    )
    aluno = aluno_service.update_aluno(matricula, dto)
    return jsonify(AlunoResponse(**aluno.__dict__).model_dump()), 200


@aluno_bp.delete("/<string:matricula>")
@swag_from('docs/aluno/aluno_delete.yml')
def deletar_aluno(matricula: str):
    aluno_service.delete_aluno(matricula)
    return jsonify({"detail": "Aluno removido com sucesso"}), 200
