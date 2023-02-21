import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

let data = [];

app.get("/welcome", (req, res) => {
  return res.status(200).json("Bem vindo!");
});

app.get("/", (req, res) => {
  return res.status(200).json(data);
});

app.post("/", (req, res) => {
  let entry = { ...req.body, id: uuidv4() };

  data.push(entry);

  return res.status(201).json(entry);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;

  const entry = data.find((entry) => {
    return entry.id === id;
  });

  return res.status(200).json(entry);
});

app.put("/:id", (req, res) => {
    let { id } = req.params;

    let index;

    let entry = data.find((entry, i) => {
        index = i;

        return entry.id === id;
    })

    let updatedUser = {...entry, ...req.body };

    data[index] = updatedUser

    return res.status(200).json(updatedUser)
})

app.delete("/:id", (req, res) => {
  let { id } = req.params;

  let filtered = data.filter((currentData) => {
    return currentData.id !== id;
  });

  data = filtered;

  return res.status(200).json(data);
});

app.listen(4000, () => {
  console.log("O app está rodando na porta: 4000");
});
