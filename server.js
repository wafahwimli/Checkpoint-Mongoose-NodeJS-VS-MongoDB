const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain
} = require("./person");

dotenv.config();

const app = express();
app.use(express.json());

/*========================================
= Mongoose Connection
========================================*/
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("💚 MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/*========================================
= ROUTES DEMANDÉES PAR LE CHECKPOINT
========================================*/

// ➤ Create one person
app.get("/create", (req, res) => {
  createAndSavePerson((err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// ➤ Create many people
app.post("/createMany", (req, res) => {
  createManyPeople((err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// ➤ Find by name
app.get("/findByName/:name", (req, res) => {
  findPeopleByName(req.params.name, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// ➤ Find one by favorite food
app.get("/findByFood/:food", (req, res) => {
  findOneByFood(req.params.food, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// ➤ Find by ID
app.get("/findById/:id", (req, res) => {
  findPersonById(req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// ➤ Update favoriteFoods then save
app.put("/addFood/:id", (req, res) => {
  findEditThenSave(req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// ➤ FindOneAndUpdate age=20
app.put("/updateAge/:name", (req, res) => {
  findAndUpdate(req.params.name, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// ➤ Delete by ID
app.delete("/delete/:id", (req, res) => {
  removeById(req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Person removed", data });
  });
});

// ➤ Delete many (name = Mary)
app.delete("/deleteMany", (req, res) => {
  removeManyPeople((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ➤ Query chain example
app.get("/burritos", (req, res) => {
  queryChain((err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

/*========================================
= SERVER
========================================*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
