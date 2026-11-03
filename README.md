# Endpoint de teste – Afiliado VTEX

Recebe qualquer chamada da VTEX e registra no log da Vercel:

- notificações do afiliado (`/api/notification/`)
- NF, rastreio e cancelamento enviados para o `marketplaceServicesEndpoint`

Sempre responde `200`.

## Deploy

1. Crie um repositório no GitHub com esta pasta (ou use `npx vercel` direto da pasta).
2. Em vercel.com → Add New → Project → importe o repositório. Não precisa configurar framework.
3. Depois do deploy você terá uma URL tipo `https://vtex-affiliate-endpoint.vercel.app`.

## Configuração na VTEX

- **Endpoint de busca do afiliado:** `https://SEU-PROJETO.vercel.app`
  (a VTEX acrescenta `/api/notification/` sozinha)
- **marketplaceServicesEndpoint** (no body do Place fulfillment order):
  `https://SEU-PROJETO.vercel.app/mkp-services`

## Ver o que chegou

Vercel → projeto → **Logs**. Cada chamada aparece como uma linha JSON com método, caminho e corpo.

## Opcional: gravar numa planilha

Defina a variável de ambiente `SHEETS_WEBHOOK_URL` com a URL de um web app do Apps Script
que faça `appendRow` do JSON recebido. A Vercel continua respondendo 200 para a VTEX
mesmo que a planilha falhe.
