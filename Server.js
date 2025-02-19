const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// OpenAI API Setup
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

// API Endpoint to Generate Itinerary
app.post("/generate-itinerary", async (req, res) => {
  try {
    const { location, days, interests } = req.body;
    
    const prompt = `Create a ${days}-day travel itinerary for ${location} focusing on ${interests}.`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 300,
    });

    res.json({ itinerary: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: "Error generating itinerary" });
  }
});

// API to Save Trip
app.post("/save-trip", async (req, res) => {
  try {
    const { userId, name, places } = req.body;

    const trip = await prisma.trip.create({
      data: {
        userId,
        places: { create: places.map((place) => ({ name: place })) },
      },
    });

    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: "Error saving trip" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
