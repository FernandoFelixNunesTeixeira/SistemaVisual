CREATE TABLE IF NOT EXISTS aluno (
  matricula VARCHAR(9) NOT NULL,
  nome VARCHAR(50) NOT NULL,
  telefone VARCHAR(50) NULL,
  email VARCHAR(50) NOT NULL,
  periodo_de_referencia VARCHAR(50) NULL,
  foto VARCHAR(45) NULL,
  PRIMARY KEY (matricula));

CREATE TABLE IF NOT EXISTS sala (
  id BIGINT NOT NULL,
  nomeSala VARCHAR(3) NULL,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS horarios (
  id VARCHAR(9) NOT NULL,
  hora_fim VARCHAR(50) NOT NULL,
  hora_inicio VARCHAR(50) NOT NULL,
  dia_semana VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS turmas (
  id BIGSERIAL NOT NULL,
  codigo_disc VARCHAR(6) NOT NULL,
  nome VARCHAR(50) NULL,
  ano INT NOT NULL,
  semestre INT NULL,
  horarios_id VARCHAR(9) NOT NULL,
  CONSTRAINT fk_horários_turmas1
    FOREIGN KEY (horarios_id)
    REFERENCES horarios (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS notificacoes (
  id BIGSERIAL NOT NULL,
  occurred_at TIMESTAMP,
  porcentagem FLOAT NULL,
  turmas_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_notificacoes_turmas1
    FOREIGN KEY (turmas_id)
    REFERENCES turmas (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE);

-- USADO PARA TESTE DE NOTIFICACAO !!! RETIRAR APOS IMPLEMENTAR HORARIOS E TURMA NA API
INSERT INTO horarios (id, hora_inicio, hora_fim, dia_semana)
VALUES ('H001', '08:00:00', '10:00:00', 'Segunda-feira');
INSERT INTO turmas (id, codigo_disc, Nome, ano, semestre, horarios_id)
VALUES (1, 'MAT101', 'Matemática Básica', 2025, 1, 'H001');

CREATE TABLE IF NOT EXISTS turmas_has_aluno (
  turmas_id INT NOT NULL,
  aluno_matricula VARCHAR(9) NOT NULL,
  PRIMARY KEY (turmas_id, aluno_matricula),
  CONSTRAINT fk_turmas_has_aluno_turmas
    FOREIGN KEY (turmas_id)
    REFERENCES turmas (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT fk_turmas_has_aluno_aluno
    FOREIGN KEY (aluno_matricula)
    REFERENCES aluno (matricula)
    ON DELETE SET NULL
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS turmas_has_sala_aula (
  turmas_id INT NOT NULL,
  sala_aula_id BIGINT NOT NULL,
  PRIMARY KEY (turmas_id, sala_aula_id),
  CONSTRAINT fk_turmas_has_sala_aula_turmas1
    FOREIGN KEY (turmas_id)
    REFERENCES turmas (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT fk_turmas_has_sala_aula_sala_aula1
    FOREIGN KEY (sala_aula_id)
    REFERENCES sala (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS docentes (
  matricula VARCHAR(9) NOT NULL,
  nome VARCHAR(50) NOT NULL,
  telefone VARCHAR(50) NULL,
  email VARCHAR(50) NOT NULL,
  foto VARCHAR(45) NULL,
  coordenador INT NOT NULL,
  PRIMARY KEY (matricula));

CREATE TABLE IF NOT EXISTS professor_has_turmas (
  professor_matricula VARCHAR(9) NOT NULL,
  turmas_id INT NOT NULL,
  PRIMARY KEY (professor_matricula, turmas_id),
  CONSTRAINT fk_professor_has_turmas_professor1
    FOREIGN KEY (professor_matricula)
    REFERENCES docentes (matricula)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT fk_professor_has_turmas_turmas1
    FOREIGN KEY (turmas_id)
    REFERENCES turmas (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS notificacoes_has_docentes (
  notificacoes_id BIGINT NOT NULL,
  docentes_matricula VARCHAR(9) NOT NULL,
  visualizado INT NOT NULL,
  PRIMARY KEY (notificacoes_id, docentes_matricula),
  CONSTRAINT fk_notificacoes_has_docentes_notificacoes1
    FOREIGN KEY (notificacoes_id)
    REFERENCES notificacoes (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT fk_notificacoes_has_docentes_docentes1
    FOREIGN KEY (docentes_matricula)
    REFERENCES docentes (matricula)
    ON DELETE SET NULL
    ON UPDATE CASCADE);
