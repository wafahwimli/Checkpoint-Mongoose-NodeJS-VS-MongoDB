require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Person = require("./person"); 

const app = express();

// Pour lire le JSON envoyé dans req.body
app.use(express.json());

// -----------------------------
// 🔌 Connexion MongoDB
// -----------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// -----------------------------
// 🌐 Routes
// -----------------------------

// Route test
app.get("/", (req, res) => {
  res.send("🔥 API is running...");
});

// ➕ CREATE : Ajouter une personne
app.post("/person", async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    await newPerson.save();
    res.status(201).json({ message: "Person created", data: newPerson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📄 READ : Afficher toutes les personnes
app.get("/persons", async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔍 READ : Afficher une seul
