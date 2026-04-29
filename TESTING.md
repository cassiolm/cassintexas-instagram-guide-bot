# Testes

## Local

```bash
npm install
cp .env.example .env
npm run dev
```

## Simular comentário

```bash
curl -X POST http://localhost:3000/test/comment \
  -H "Content-Type: application/json" \
  -d '{"username":"cass_test","text":"GUIA"}'
```

## Produção

1. Faça deploy.
2. Configure Webhook na Meta.
3. Mantenha `DRY_RUN=true`.
4. Comente `GUIA` em um post de teste.
5. Veja os logs.
6. Só depois mude para `DRY_RUN=false`.
