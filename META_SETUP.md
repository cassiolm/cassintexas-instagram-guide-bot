# Meta / Instagram Setup

## Requisitos

- Conta Instagram Professional: Creator ou Business.
- Conta conectada a uma Página do Facebook/Meta.
- App no Meta Developers.
- Webhook configurado.
- Token com permissões necessárias.

## Permissões prováveis

```txt
instagram_basic
instagram_manage_comments
instagram_business_manage_messages
pages_show_list
pages_read_engagement
```

A Meta pode exigir App Review para uso fora do modo de desenvolvimento.

## Webhook

Callback URL:

```txt
https://seu-app.onrender.com/webhook
```

Verify Token:

```txt
O mesmo valor de META_VERIFY_TOKEN
```

## Teste seguro

Mantenha:

```txt
DRY_RUN=true
```

Depois de validar logs e permissões, mude para:

```txt
DRY_RUN=false
```
