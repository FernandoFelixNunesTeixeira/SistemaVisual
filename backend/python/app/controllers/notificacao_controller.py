from flask import Blueprint, request, jsonify
from ..services.notificacao_service import NotificacaoService
from ..repositories.notificacao_repository import NotificacaoRepository
from ..schemas.notificacao_schema import CreateNotificacaoRequest, NotificacaoResponse
from ..DTOs.notificacao_dto import CreateNotificacaoDTO, NotificacaoDTO

notificacao_bp = Blueprint("notificacoes", __name__, url_prefix="/notificacoes")
notificacao_service = NotificacaoService(NotificacaoRepository())

@notificacao_bp.post("/")
def criar_notificacao():
    data = request.get_json()
    schema = CreateNotificacaoRequest(**data)

    dto = CreateNotificacaoDTO(    
        occurred_at=schema.occurred_at,
        nome_sala=schema.nome_sala,
        porcentagem=schema.porcentagem,
    )
    notificacao = notificacao_service.process_notificacao(dto)
    
    response = NotificacaoResponse(
        id=notificacao.id, # Id auto gerado
        occurred_at=notificacao.occurred_at,
        turmas_id=notificacao.turmas_id,
        porcentagem=notificacao.porcentagem
    )
    return jsonify(response.model_dump()), 201


@notificacao_bp.get("/")
def listar_notificacoes():
    notificacoes = notificacao_service.list_notificacoes()
    resposta = [NotificacaoResponse(**n.__dict__).model_dump() for n in notificacoes]
    return jsonify(resposta), 200

@notificacao_bp.get("/<int:id>")
def buscar_por_id(id: int):
    notificacao = notificacao_service.get_notificacao(id)
    return jsonify(NotificacaoResponse(**notificacao.__dict__).model_dump()), 200

@notificacao_bp.delete("/<int:id>")
def deletar_notificacao(id: int):
    notificacao_service.delete_notificacao(id)
    return jsonify({"detail": "Notificacao removida com sucesso"}), 200
