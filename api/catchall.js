// Recebe qualquer chamada da VTEX (notificação do afiliado, NF, rastreio, cancelamento)
// e registra no log da Vercel. Opcional: repassa para uma planilha (SHEETS_WEBHOOK_URL).

export default async function handler(req, res) {
  const entry = {
    receivedAt: new Date().toISOString(),
    method: req.method,
    // Caminho original chamado pela VTEX (ex.: /api/notification/), vindo do rewrite em vercel.json
    path: '/' + (req.query.__path || ''),
    query: Object.fromEntries(Object.entries(req.query).filter(([k]) => k !== '__path')),
    body: req.body ?? null,
  };

  // Aparece em Vercel > projeto > Logs
  console.log(JSON.stringify(entry));

  // Opcional: grava em um Google Sheets via web app do Apps Script
  if (process.env.SHEETS_WEBHOOK_URL) {
    try {
      await fetch(process.env.SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    } catch (err) {
      console.error('Falha ao enviar para o Sheets:', err.message);
    }
  }

  // A VTEX só precisa de um 200 rápido
  res.status(200).json({ ok: true });
}
