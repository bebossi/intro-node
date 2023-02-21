import express from "express";
import connect from "./src/config/dbConnect.js";
import UserModel from "./src/models/User.js";

const app = express();

app.use(express.json());

async function connectDb() {
  try {
    const db = await connect();
    db.on("error", console.log.bind(console, "Erro de conexão"));
    db.once("open", () => {
      console.log("Conexão com o banco de dados estabelecida com sucesso");
    });
    app.listen(4000, () => {
      console.log("O app está rodando na porta: 4000");
    });
  } catch (error) {
    console.log(error);
  }
}

app.get("/", async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuário." });
  }
});

app.post("/", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
  }
});

app.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let update = req.body;

     await UserModel.findByIdAndUpdate(id, update);

    return res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await UserModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Usuario excluido" });
  } catch (err) {
    console.log(err);
  }
});

connectDb();
