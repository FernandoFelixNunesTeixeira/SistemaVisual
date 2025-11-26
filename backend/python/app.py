import os
from flask import Flask, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from flask_cors import CORS
from flasgger import Swagger
from app.infrastructure.database.db import db
from app.controllers.aluno_controller import aluno_bp
from app.controllers.docente_controller import docente_bp
from app.controllers.horario_controller import horario_bp
from app.controllers.sala_controller import sala_bp
from app.controllers.notificacao_controller import notificacao_bp
from app.controllers.turma_controller import turma_bp
from pydantic import ValidationError
from datetime import datetime, timedelta, timezone
#from infrastructure.database.db import db
#from entities.docente import Docente
from flask_bcrypt import Bcrypt
import json



def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'teste-funcional-jwt'

    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    jwt = JWTManager(app)

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
    
    bcrypt = Bcrypt(app)
    db.init_app(app)

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

    @app.route("/")
    def root():
        return jsonify({"message": "API is running"}), 200

    @app.route("/logintoken", methods=["POST"])
    def create_token():
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        #user = Docente.query.filter_by(email=email).first()
        
        #Rever como obter usuário
        user = docente_bp.get("/PC3026159")
        access_token = create_access_token(identity=email)
        response = {"access_token": access_token}
        if user is None:
            return jsonify({"error": "Wrong email or passwords"}), 401
    
        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Unauthorized"}), 401
    
        
        #return jsonify({"message": "API is running"}), 200
        return response
    
    @app.route("/signup", methods=["POST"])
    def signup():
        email = request.json["email"]
        password = request.json["password"]

        user_exists = docente_bp.get("/PC3026159")

        if user_exists:
            return jsonify({"error": "Email already exists"}), 409
    
        hashed_password = bcrypt.generate_password_hash(password)
        #new_user = docente_bp.post("/")
        #Falta fazer requisição
    
    @app.after_request
    def refresh_expiring_jwts(response):
        try:
            exp_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                data = response.get_json()
                if type(data) is dict:
                    data["access_token"] = access_token
                    response.data = json.dumps(data)
        except (RuntimeError, KeyError):
            #Em caso de jwt inválido
            return response

    @app.route("/logout", methods=["POST"])
    def logout():
        response = jsonify({"msg": "logout successful"}) 
        unset_jwt_cookies(response)
        return response
          
    @app.route('/profile/<getemail>')
    @jwt_required()
    def my_profile(getemail):
        print(getemail)
        if(not getemail):
            return jsonify({"error": "Unauthorized Access"}), 401
    
        #Rever se isso funciona
        user = docente_bp.get("/PC3026159")

        response_body = {
            "matricula": user.matricula,
            "nome": user.nome,
            "telefone": user.telefone,
            "email": user.email,
            "foto": user.foto,
            "coordenador": user.coordenador
        }

        return docente_bp

    return app


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all() 
    app.run(host="0.0.0.0", port=5000, debug=True)
