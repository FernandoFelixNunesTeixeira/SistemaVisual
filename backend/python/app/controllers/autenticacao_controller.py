from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required
from datetime import datetime, timedelta, timezone
import json
from ..infrastructure.security.extensoes import bcrypt
from ..services.docente_service import DocenteService, DocenteNotFoundError
from ..interfaces.docente_repository import IDocenteRepository
import requests
from flasgger import swag_from

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')
docente_service = DocenteService()

@auth_bp.route("/login", methods=["POST"])
@swag_from('docs/docente/docente_login.yml')
def create_token():
    email = request.json.get("email", None)
    senha_plaintext = request.json.get("senha", None)
    #Comentado como bloco de texto, para não ter nem que expor a chave
    #secreta da api, nem atrapalhar testes da aplicação, mas funciona
    #a verificação do recaptcha no backend
    """response = request.json.get("captchatoken", None)
    recaptcha_request = requests.post(
        'https://www.google.com/recaptcha/api/siteverify',
        data = {
            'secret': '<Trocar pela chave secreta do recaptcha>',
            'response': response
        }
    ).json()

    if not recaptcha_request.get('success'):
        #print('Recaptcha Inválido')
        return jsonify({"error": f"Recaptcha Inválido"}), 400 }"""
        
    
    if not email or not senha_plaintext:
        return jsonify({"error": "Email e senha são necessarios"}), 400

    try:
        user = docente_service.get_docente_by_email(email)
        stored_hash = getattr(user, 'senha_hashed', getattr(user, 'senha', None))
        
        if not stored_hash or not bcrypt.check_password_hash(stored_hash, senha_plaintext):
            return jsonify({"error": "Não autorizado"}), 401

        access_token = create_access_token(identity=email)
        return jsonify({"access_token": access_token})

    except DocenteNotFoundError:
        return jsonify({"error": "Senha ou Email incorreto"}), 401
    except Exception as e:
        print(f"Erro no login: {e}")
        return jsonify({"error": "Internal Server Error: ", "log": e}), 500

@auth_bp.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"}) 
    unset_jwt_cookies(response)
    return response

@auth_bp.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if isinstance(data, dict):
                data["access_token"] = access_token
                response.data = json.dumps(data)
    except (RuntimeError, KeyError):
        return response
    return response