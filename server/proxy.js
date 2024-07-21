import express, { json } from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(json());

app.get("/search", async (req, res) => {
  const { q, type } = req.query;
  const token = req.headers.authorization;

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        q
      )}&type=${type}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log(`Spotify API response: ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
