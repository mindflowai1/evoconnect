# 🔑 Sua Configuração da Evolution API

Análise do seu arquivo `.env` e informações importantes.

## ✅ API Key Encontrada

Sua **API Key** é:

```
qwSYwLlijZOh+FaBHrK0tfGzxG6W/J4O
```

### ⚠️ ATENÇÃO: Espaço Extra Detectado!

No seu arquivo `.env`, há um **espaço após o `=`**:

```env
AUTHENTICATION_API_KEY= qwSYwLlijZOh+FaBHrK0tfGzxG6W/J4O
                    ↑
              Espaço aqui!
```

**Isso pode causar problemas!** Remova o espaço:

```env
AUTHENTICATION_API_KEY=qwSYwLlijZOh+FaBHrK0tfGzxG6W/J4O
```

---

## 🌐 URL da API

### Problema Identificado

Seu `SERVER_URL` está usando uma variável:

```env
SERVER_URL=https://$(PRIMARY_DOMAIN)
```

**Isso não vai funcionar!** Você precisa definir o domínio real.

### ✅ Solução

Substitua por uma das opções:

**Opção 1 - Se você tem um domínio:**
```env
SERVER_URL=https://evolution.suaempresa.com
```

**Opção 2 - Se está testando localmente:**
```env
SERVER_URL=http://localhost:8080
```

**Opção 3 - Se usa IP:**
```env
SERVER_URL=http://192.168.1.100:8080
```

**Opção 4 - Se usa um serviço (ex: Easypanel):**
```env
SERVER_URL=https://seu-dominio.easypanel.host
```

### 🔍 Como Descobrir sua URL

1. **Se está rodando localmente:**
   - URL: `http://localhost:8080`

2. **Se está em um servidor:**
   - Verifique o domínio/IP do servidor
   - Porta: `8080` (conforme seu `.env`)

3. **Se usa Easypanel (pelo que vejo no S3_ENDPOINT):**
   - Provavelmente algo como: `https://evolution.kof6cn.easypanel.host`
   - Ou verifique no painel do Easypanel

4. **Teste manualmente:**
   ```bash
   # Tente acessar no navegador:
   http://seu-servidor:8080/instance/fetchInstances
   ```

---

## ✅ Configurações Corretas Identificadas

### CORS Configurado ✅

```env
CORS_ORIGIN=*
CORS_METHODS=GET,POST,PUT,DELETE
CORS_CREDENTIALS=true
```

**Isso está correto!** Permite requisições de qualquer domínio, o que é bom para desenvolvimento.

**Para produção, recomendo:**
```env
CORS_ORIGIN=https://seu-usuario.github.io,http://localhost:8000
```

### Porta Configurada ✅

```env
SERVER_PORT=8080
```

### QR Code Configurado ✅

```env
QRCODE_LIMIT=30
QRCODE_COLOR='#175197'
```

---

## 📝 Resumo para EvoConnect

### 1. API Key (copie sem espaços):
```
qwSYwLlijZOh+FaBHrK0tfGzxG6W/J4O
```

### 2. URL da API:

**Você precisa descobrir qual é!** Opções comuns:

- **Local:** `http://localhost:8080`
- **Easypanel:** `https://evolution.kof6cn.easypanel.host` (ou similar)
- **Servidor próprio:** `https://seu-dominio.com` ou `http://seu-ip:8080`

**Como descobrir:**
1. Acesse o painel do Easypanel (se usa)
2. Veja a URL do serviço Evolution API
3. Ou teste: `http://localhost:8080` se está local

### 3. Teste Rápido

Abra no navegador (ou Postman):
```
http://localhost:8080/instance/fetchInstances
```

Com header:
```
apikey: qwSYwLlijZOh+FaBHrK0tfGzxG6W/J4O
```

Se funcionar, essa é sua URL! ✅

---

## 🔧 Correções Necessárias no `.env`

### 1. Remover espaço da API Key

**Antes:**
```env
AUTHENTICATION_API_KEY= qwSYwLlijZOh+FaBHrK0tfGzxG6W/J4O
```

**Depois:**
```env
AUTHENTICATION_API_KEY=qwSYwLlijZOh+FaBHrK0tfGzxG6W/J4O
```

### 2. Definir SERVER_URL corretamente

**Antes:**
```env
SERVER_URL=https://$(PRIMARY_DOMAIN)
```

**Depois (escolha uma):**
```env
# Opção 1 - Local
SERVER_URL=http://localhost:8080

# Opção 2 - Produção
SERVER_URL=https://evolution.suaempresa.com

# Opção 3 - Easypanel
SERVER_URL=https://evolution.kof6cn.easypanel.host
```

### 3. (Opcional) Ajustar CORS para produção

**Para produção, é mais seguro:**
```env
CORS_ORIGIN=https://seu-usuario.github.io,http://localhost:8000
```

---

## 🚀 Próximos Passos

### 1. Corrigir o `.env`

Edite o arquivo e:
- ✅ Remova espaço da API Key
- ✅ Defina SERVER_URL corretamente
- ✅ (Opcional) Ajuste CORS

### 2. Reiniciar Evolution API

Após editar o `.env`:

**Docker:**
```bash
docker-compose restart
# ou
docker restart evolution-api
```

**PM2:**
```bash
pm2 restart evolution-api
```

**Systemd:**
```bash
systemctl restart evolution-api
```

### 3. Testar a API

```bash
curl -H "apikey: qwSYwLlijZOh+FaBHrK0tfGzxG6W/J4O" \
     http://localhost:8080/instance/fetchInstances
```

### 4. Configurar no EvoConnect

1. **URL da API:** (a que você descobriu/testou)
2. **API Key:** `qwSYwLlijZOh+FaBHrK0tfGzxG6W/J4O` (sem espaços!)

---

## 🔍 Como Descobrir sua URL (Passo a Passo)

### Se está rodando localmente:

1. **Teste:**
   ```
   http://localhost:8080
   ```

2. **Se funcionar:** Use `http://localhost:8080`

### Se está no Easypanel:

1. **Acesse o painel:** https://easypanel.io
2. **Vá em seu projeto**
3. **Encontre o serviço Evolution API**
4. **Veja a URL pública** (geralmente algo como `https://evolution.xxxxx.easypanel.host`)

### Se está em outro servidor:

1. **Descubra o IP/domínio do servidor**
2. **Teste:** `http://ip-ou-dominio:8080`
3. **Se funcionar:** Use essa URL

### Teste Universal:

```bash
# No terminal, teste:
curl http://localhost:8080/instance/fetchInstances

# Ou no navegador:
http://localhost:8080/instance/fetchInstances
```

Se retornar JSON (ou erro de autenticação), a URL está correta! ✅

---

## ⚠️ Segurança

### ⚠️ IMPORTANTE: Proteja sua API Key!

Você compartilhou seu `.env` aqui. **Recomendações:**

1. **Se este é um ambiente de produção:**
   - ⚠️ Considere gerar uma nova API Key
   - ⚠️ Não compartilhe o `.env` publicamente

2. **Se é desenvolvimento/teste:**
   - ✅ Pode usar esta chave
   - ⚠️ Mas não compartilhe em fóruns públicos

3. **Boas práticas:**
   - Use `.gitignore` para não commitar `.env`
   - Rotacione chaves periodicamente
   - Use chaves diferentes para dev/prod

---

## 📋 Checklist Final

```
□ Removi espaço da API Key no .env
□ Defini SERVER_URL corretamente
□ Reiniciei a Evolution API
□ Testei a URL manualmente
□ Configurei no EvoConnect:
  └─ [ ] URL da API: _______________
  └─ [ ] API Key: qwSYwLlijZOh+FaBHrK0tfGzxG6W/J4O
□ Testei conexão no EvoConnect
□ Funcionou! ✅
```

---

## 🆘 Ainda com Problemas?

1. **Verifique logs da API:**
   ```bash
   docker logs evolution-api
   ```

2. **Teste endpoints:**
   ```bash
   curl -H "apikey: qwSYwLlijZOh+FaBHrK0tfGzxG6W/J4O" \
        http://localhost:8080/instance/fetchInstances
   ```

3. **Veja o console do navegador (F12)** ao usar EvoConnect

4. **Consulte:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

<div align="center">
  <p><strong>Configuração pronta? 🎉 Teste no EvoConnect!</strong></p>
  <p>Dúvidas? Veja <a href="QUICK_START.md">Guia Rápido</a></p>
</div>

