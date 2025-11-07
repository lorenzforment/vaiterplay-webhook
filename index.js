import express from "express";

const app = express();
app.use(express.json());

// Use o mesmo token que você colocará no painel da Meta
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "vaiterplay8234";

// Verificação do webhook (GET)
app.get("/webhook", (req, res) => {
  try {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    console.log("GET /webhook -- mode:", mode, "token:", token, "challenge:", challenge);

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // IMPORTANTE: enviar o challenge como texto puro, status 200
      res.status(200).type("text/plain").send(challenge);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.error("Erro na rota GET /webhook:", err);
    res.sendStatus(500);
  }
});

// Recebe POSTs do Flow/WhatsApp
app.post("/webhook", (req, res) => {
  try {
    console.log("POST /webhook - body:", JSON.stringify(req.body, null, 2));
    // aqui você processa eventos e retorna 200 rapidamente
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erro na rota POST /webhook:", err);
    res.sendStatus(500);
  }
});

// rota simples para checagem rápida
app.get("/", (req, res) => res.send("ok"));

// Porta dinâmica (Render define PORT)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Webhook server listening on port ${PORT}`));
