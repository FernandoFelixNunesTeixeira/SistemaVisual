import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flasgger import Swagger
from flask_jwt_extended import verify_jwt_in_request
from app.infrastructure.database.db import db
from app.controllers.aluno_controller import aluno_bp
from app.controllers.docente_controller import docente_bp
from app.controllers.horario_controller import horario_bp
from app.controllers.sala_controller import sala_bp
from app.controllers.notificacao_controller import notificacao_bp
from app.controllers.turma_controller import turma_bp
from app.infrastructure.security.autenticacao import auth_bp
from pydantic import ValidationError
from datetime import datetime, timedelta, timezone
#from infrastructure.database.db import db
#from entities.docente import Docente
import json
from app.infrastructure.security.extensoes import bcrypt, jwt

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'teste-funcional-jwt'

    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

    DB_USER = os.getenv("POSTGRES_USER", "user")
    DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "password")
    DB_HOST = os.getenv("DB_HOST", "postgres")
    DB_PORT = os.getenv("DB_PORT", "5432")
    DB_NAME = os.getenv("POSTGRES_DB", "mydatabase")

    DATABASE_URL = (
        f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    
    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)

    CORS(app)

    app.config["SWAGGER"] = {
        "title": "API",
        "uiversion": 3,
    }
    Swagger(app, template_file="app/controllers/docs/swagger.yml")

    app.register_blueprint(aluno_bp, url_prefix="/api/alunos")
    app.register_blueprint(docente_bp, url_prefix="/api/docentes")
    app.register_blueprint(sala_bp, url_prefix="/api/salas")
    app.register_blueprint(horario_bp, url_prefix="/api/horarios")
    app.register_blueprint(notificacao_bp, url_prefix="/api/notificacoes")
    app.register_blueprint(turma_bp, url_prefix="/api/turmas")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    
    @app.route("/")
    def root():
        return jsonify({"message": "API is running"}), 200

    @app.before_request
    def check_jwt_protection():
        if request.method == 'OPTIONS':
            return # CORS

        # rotas que NÃO precisam de token
        public_endpoints = [
            'root',
            'auth.create_token', 
            'static',
        ]

        # Signup
        if request.endpoint == 'docente.criar_docente' and request.method == 'POST':
            return
        
        # Notificacao precisa ser acessado por código externo camera e redis. Por enquanto não tera segurança
        if request.endpoint and request.endpoint.startswith('notificacoes.'):
            return
        
        # permite Swagger (se começa com flasgger)
        if request.endpoint and request.endpoint.startswith('flasgger'):
            return

        # se rota não está na lista public, exige login
        if request.endpoint and request.endpoint not in public_endpoints:
            verify_jwt_in_request()

    return app


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all() 
    app.run(host="0.0.0.0", port=5000, debug=True)
