# CassInTexas Instagram Guide Bot

Bot em **Node.js + Express** para mandar um link do guia gratuito por DM quando alguém comentar **GUIA** no Instagram.

## Fluxo

```txt
Pessoa comenta "GUIA"
        ↓
Meta chama /webhook
        ↓
Bot valida o evento
        ↓
Bot identifica a palavra-chave
        ↓
Bot envia private reply com o link do guia
```

## Rodar localmente

```bash
npm install
cp .env.example .env
npm run dev
```

Teste local:

```bash
curl -X POST http://localhost:3000/test/comment \
  -H "Content-Type: application/json" \
  -d '{"username":"cass_test","text":"GUIA"}'
```

Com `DRY_RUN=true`, o bot só mostra no log a mensagem que enviaria.

## Deploy no Render

1. Suba esse projeto para o GitHub.
2. Crie um **New Web Service** no Render.
3. Conecte o repositório.
4. Use:
   - Build command: `npm install`
   - Start command: `npm start`
5. Configure as variáveis de ambiente.
6. Use esta URL no Meta Developers:

```txt
https://seu-app.onrender.com/webhook
```

## Variáveis principais

```txt
DRY_RUN=true
META_VERIFY_TOKEN=...
META_APP_SECRET=...
IG_USER_ID=...
META_ACCESS_TOKEN=...
GUIDE_URL=...
TRIGGER_KEYWORDS=guia,quero guia,manda o guia
```

## Importante

Private reply deve ser usado como uma resposta direta ao comentário da pessoa. Evite spam. O fluxo ideal é:

```txt
Comentou GUIA → recebe uma DM → se responder, conversa continua.
```
