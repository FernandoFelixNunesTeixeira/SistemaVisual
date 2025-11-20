from flask import Blueprint, request, jsonify
from ..services.docente_service import DocenteService
from ..repositories.docente_repository import DocenteRepository
from ..schemas.docente_schema import CreateDocenteRequest, DocenteResponse
from ..DTOs.docente_dto import DocenteDTO

docente_bp = Blueprint("docentes", __name__, url_prefix="/docentes")
docente_service = DocenteService(DocenteRepository())

@docente_bp.post("/")
def criar_docente():
    data = request.get_json()
    schema = CreateDocenteRequest(**data)

    dto = DocenteDTO(
        nome=schema.nome,
        email=schema.email,
        telefone=schema.telefone,
        matricula=schema.matricula,
        foto=schema.foto,
        coordenador=schema.coordenador,
    )
    docente = docente_service.create_docente(dto)
    return jsonify(DocenteResponse(**docente.__dict__).model_dump()), 201


@docente_bp.get("/")
def listar_docentes():
    alunos = docente_service.list_docentes()
    resposta = [DocenteResponse(**a.__dict__).model_dump() for a in alunos]
    return jsonify(resposta), 200

@docente_bp.get("/<string:matricula>")
def buscar_por_matricula(matricula: str):
    docente = docente_service.get_docente(matricula)
    return jsonify(DocenteResponse(**docente.__dict__).model_dump()), 200

@docente_bp.put("/<string:matricula>")
def atualizar_aluno(matricula: str):
    data = request.get_json()
    schema = CreateDocenteRequest(**data)

    dto = DocenteDTO(
        matricula=schema.matricula,
        nome=schema.nome,
        email=schema.email,
        telefone=schema.telefone,
        foto=schema.foto,
        coordenador=schema.coordenador,
    )
    docente = docente_service.update_docente(matricula, dto)
    return jsonify(DocenteResponse(**docente.__dict__).model_dump()), 200


@docente_bp.delete("/<string:matricula>")
def deletar_docente(matricula: str):
    docente_service.delete_docente(matricula)
    return jsonify({"detail": "Docente removido com sucesso"}), 200