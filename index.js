import express from "express";

const app = express();
app.use(express.json());

// ✅ Etapa de verificação do webhook da Meta
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "vaiterplay8234"; // <-- personalize esse token

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("✔️ Webhook verificado com sucesso!");
    return res.status(200).send(challenge);
  } else {
    console.log("❌ Falha na verificação do webhook.");
    return res.sendStatus(403);
  }
});

// ✅ Recebe eventos e mensagens do WhatsApp
app.post("/webhook", (req, res) => {
  console.log("📩 Evento recebido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// ✅ Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Webhook rodando na porta ${PORT}`));

import express from "express";

const app = express();
app.use(express.json());

// Endpoint usado pelo Meta para checar se está tudo ok
app.get("/webhook", (req, res) => {
  return res.status(200).send("Webhook verificado com sucesso!");
});

// Endpoint usado para receber dados dos fluxos do WhatsApp
app.post("/webhook", (req, res) => {
  console.log("📩 Dados recebidos do Flow:", req.body);
  return res.status(200).json({ success: true });
});

// Render precisa dessa porta dinâmica
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));

