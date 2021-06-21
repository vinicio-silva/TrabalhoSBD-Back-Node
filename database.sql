CREATE DATABASE bd_universidade;

CREATE TABLE bloco(
	idbloco smallint PRIMARY KEY,
	nomebloco varchar(8) NOT NULL
);
CREATE TABLE sala(
	idsala smallint PRIMARY KEY,
	capacidade smallint NOT NULL,
	idbloco smallint REFERENCES bloco(idbloco)	
);
CREATE TABLE faculdade(
	siglafac varchar(5) PRIMARY KEY,
	orcamento numeric(10,2),
	idbloco smallint REFERENCES bloco(idbloco)
);

CREATE TABLE pessoa(
	idpes smallint PRIMARY KEY,
	nomepes varchar(30) NOT NULL,
	datanascim date
);

CREATE TABLE professor(
	idpes smallint REFERENCES pessoa(idpes),
	salario numeric(5,2) NOT NULL,
	siglafac varchar(5) REFERENCES faculdade(siglafac),
	PRIMARY KEY(idpes)
);
CREATE TABLE diretor(
	idpes smallint REFERENCES professor(idpes),
	PRIMARY KEY(idpes)
);

CREATE TABLE aluno(
	idpes smallint REFERENCES pessoa(idpes),
	cra numeric(3,2),
	telefone varchar(11),
	orientador_ic smallint REFERENCES professor(idpes),
	siglafac varchar(5) REFERENCES faculdade(siglafac),
	PRIMARY KEY(idpes)
);


CREATE TABLE diretor_fac(
	idpes smallint REFERENCES diretor(idpes),
	siglafac varchar(5) REFERENCES faculdade(siglafac),
	PRIMARY KEY(idpes, siglafac)
);

CREATE TABLE disciplina(
	sigladis varchar(6) PRIMARY KEY,
	nomedis varchar(20) NOT NULL,
	creditos smallint NOT NULL
);
CREATE TABLE pre_req(
	sigladis varchar(6) REFERENCES disciplina(sigladis),
	siglapre varchar(6) REFERENCES disciplina(sigladis),
	PRIMARY KEY(sigladis, siglapre)
);
CREATE TABLE discip_fac(
	siglafac varchar(5) REFERENCES faculdade(siglafac),
	sigladis varchar(6) REFERENCES disciplina(sigladis),
	PRIMARY KEY(siglafac, sigladis)
);

CREATE TABLE turma(
	idturma smallint PRIMARY KEY,
	ano varchar(4) NOT NULL,
	semestre char CHECK(semestre in ('1', '2')),
	idsala smallint REFERENCES sala(idsala)
);
CREATE TABLE prof_tur(
	idpes smallint REFERENCES professor(idpes),
	idturma smallint REFERENCES turma(idturma),
	PRIMARY KEY(idpes, idturma)
);
CREATE TABLE inscricao(
	idpes smallint REFERENCES aluno(idpes),
	idturma smallint REFERENCES turma(idturma),
	nota numeric (3,2),
	faltas smallint,
	PRIMARY KEY(idpes, idturma)
);

