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

// ✅ Recebe eventos e mensagens do WhatsApp / Flow
app.post("/webhook", (req, res) => {
  console.log("📩 Dados recebidos do Flow:", JSON.stringify(req.body, null, 2));
  return res.status(200).json({ success: true });
});

// ✅ Verificação simples (usada pelo Flow Builder)
app.get("/", (req, res) => {
  res.send("Webhook verificado com sucesso!");
});

// ✅ Inicializa o servidor na porta do Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Webhook rodando na porta ${PORT}`));
