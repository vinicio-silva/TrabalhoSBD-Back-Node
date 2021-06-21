const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./bd");

app.use(cors());
app.use(express.json());

//Rotas

//Inserir bloco
app.post("/bloco", async (req, res) => {
  try{
    const { idbloco,nomebloco } = req.body;
    const newBloco = await pool.query("INSERT INTO bloco (idbloco,nomebloco) VALUES($1,$2) RETURNING *",
    [idbloco,nomebloco]
    );
    res.json(newBloco.rows);
    } catch (err) {
    console.error(err.message);
  }
});

//Consultar todos blocos
app.get("/bloco", async(req, res) => {
  try{
    const allBloco = await pool.query("SELECT * FROM bloco");
    res.json(allBloco.rows)
  } catch (err) {
    console.error(err.message);
  }
});

//Consultar bloco por id
app.get("/bloco/:idbloco", async(req, res) => {
  try{
    const { idbloco } = req.params
    const bloco = await pool.query("SELECT * FROM bloco WHERE idbloco = $1", [idbloco]);
    res.json(bloco.rows)
  } catch (err) {
    console.error(err.message);
  }
});

//Update bloco
app.put("/bloco/:idbloco", async(req, res) => {
  try{
    const { idbloco } = req.params;
    const { nomebloco } = req.body;
    const updatebloco = await pool.query("UPDATE bloco SET nomebloco = $1 WHERE idbloco = $2", [nomebloco,idbloco]);
    res.json("Bloco atualizado!")
  } catch (err) {
    console.error(err.message);
  }
});

//Deletar bloco
app.delete("/bloco/:idbloco", async(req, res) => {
  try{
    const { idbloco } = req.params;
    const deletebloco = await pool.query("DELETE FROM bloco WHERE idbloco = $1", [idbloco]);
    res.json("Bloco deletado!")
  } catch (err) {
    console.error(err.message);
  }
});

//Inserir pessoa
app.post("/pessoa", async (req, res) => {
  try{
    const { idpes,nomepes,datanascim } = req.body;
    const newPessoa = await pool.query("INSERT INTO pessoa (idpes,nomepes,datanascim) VALUES($1,$2,$3) RETURNING *",
    [idpes,nomepes,datanascim]
    );
    res.json(newPessoa.rows);
    } catch (err) {
    console.error(err.message);
  }
});

//Consultar todas pessoas
app.get("/pessoa", async(req, res) => {
  try{
    const allPessoa = await pool.query("SELECT * FROM pessoa");
    res.json(allPessoa.rows)
  } catch (err) {
    console.error(err.message);
  }
});

//Consultar pessoa por id
app.get("/pessoa/:idpes", async(req, res) => {
  try{
    const { idpes } = req.params
    const pessoa = await pool.query("SELECT * FROM pessoa WHERE idpes = $1", [idpes]);
    res.json(pessoa.rows)
  } catch (err) {
    console.error(err.message);
  }
});

//Update pessoa
app.put("/pessoa/:idpes", async(req, res) => {
  try{
    const { idpes } = req.params;
    const { nomepes, datanascim } = req.body;
    const updatepessoa = await pool.query("UPDATE pessoa SET nomepes = $1, datanascim = $2 WHERE idpes = $3", [nomepes,datanascim,idpes]);
    res.json("Pessoa atualizada!")
  } catch (err) {
    console.error(err.message);
  }
});

//Deletar pessoa
app.delete("/pessoa/:idpes", async(req, res) => {
  try{
    const { idpes } = req.params;
    const deletepessoa = await pool.query("DELETE FROM pessoa WHERE idpes = $1", [idpes]);
    res.json("Pessoa deletada!")
  } catch (err) {
    console.error(err.message);
  }
});

app.listen( 5000, () => {
  console.log("Server inicializado");
});