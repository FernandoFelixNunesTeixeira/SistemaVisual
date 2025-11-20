import os
from flask import Flask, jsonify
from flask_cors import CORS
from flasgger import Swagger
from app.infrastructure.database.db import db
from app.controllers.aluno_controller import aluno_bp
from app.controllers.sala_controller import sala_bp
from pydantic import ValidationError

def create_app():
    app = Flask(__name__)

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

    CORS(app)

    app.config["SWAGGER"] = {
        "title": "API",
        "uiversion": 3,
    }
    Swagger(app, template_file="docs/salas.yml")

    app.register_blueprint(aluno_bp, url_prefix="/api/alunos")
    app.register_blueprint(sala_bp, url_prefix="/api/salas")

    @app.route("/")
    def root():
        return jsonify({"message": "API is running"}), 200

    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all() 
    app.run(host="0.0.0.0", port=5000, debug=True)
