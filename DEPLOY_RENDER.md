# Deploy no Render

## Passos

1. Suba o projeto para o GitHub.
2. No Render, clique em **New Web Service**.
3. Conecte o repositório.
4. Configure:

```txt
Build Command: npm install
Start Command: npm start
```

5. Adicione as variáveis de ambiente:

```txt
PORT=3000
DRY_RUN=true
META_VERIFY_TOKEN=...
META_APP_SECRET=...
IG_USER_ID=...
META_ACCESS_TOKEN=...
GUIDE_URL=...
TRIGGER_KEYWORDS=guia,quero guia,manda o guia,me manda o guia,ebook,e-book,free ebook,quero o guia
BRAND_NAME=CassInTexas
```

6. Use a URL abaixo no Meta Developers:

```txt
https://seu-app.onrender.com/webhook
```
