# 🔑 Como Obter a API Key da Evolution API

Guia completo para encontrar e configurar sua API Key da Evolution API.

## 📍 Onde Encontrar a API Key

A localização da API Key depende de **como a Evolution API está instalada/configurada**. Veja abaixo:

---

## 🐳 Se você instalou a Evolution API (Docker)

### Método 1: Arquivo `.env`

A API Key geralmente está no arquivo `.env` da Evolution API:

```bash
# Localize o arquivo .env
# Geralmente está na pasta onde você instalou a Evolution API

# Procure por uma linha como:
AUTHENTICATION_API_KEY=sua-chave-aqui
# ou
AUTHENTICATION_TYPE=apikey
AUTHENTICATION_API_KEY=sua-chave-aqui
```

**Como acessar:**

1. **Windows:**
   - Navegue até a pasta da Evolution API
   - Abra o arquivo `.env` com Bloco de Notas
   - Procure por `AUTHENTICATION_API_KEY`

2. **Linux/Mac:**
   ```bash
   cd /caminho/para/evolution-api
   cat .env | grep API_KEY
   # ou
   nano .env
   ```

### Método 2: docker-compose.yml

Se você usa Docker Compose, pode estar no arquivo `docker-compose.yml`:

```yaml
environment:
  - AUTHENTICATION_API_KEY=sua-chave-aqui
```

**Como acessar:**
```bash
# No terminal, na pasta do docker-compose.yml
cat docker-compose.yml | grep API_KEY
```

### Método 3: Variáveis de Ambiente do Sistema

A API Key pode estar configurada como variável de ambiente:

**Windows:**
```powershell
# PowerShell
$env:AUTHENTICATION_API_KEY

# CMD
echo %AUTHENTICATION_API_KEY%
```

**Linux/Mac:**
```bash
echo $AUTHENTICATION_API_KEY
```

---

## ☁️ Se você usa um Serviço/Plataforma

### Evolution API Cloud / Hosted

Se você usa uma versão hospedada (cloud):

1. **Acesse o painel de controle** da plataforma
2. **Vá em "Configurações"** ou **"API"**
3. **Procure por "API Key"** ou **"Authentication Key"**
4. **Copie a chave** (geralmente pode gerar uma nova)

### Serviços Comuns:

- **Atend.ai Evolution API**
  - Painel: https://panel.atend.ai
  - Seção: Configurações > API Keys

- **Outros provedores**
  - Consulte a documentação do seu provedor
  - Geralmente está em: Dashboard > Settings > API

---

## 🖥️ Se você tem acesso ao servidor

### Verificar Logs da API

A API Key pode aparecer nos logs quando a API inicia:

```bash
# Docker
docker logs evolution-api | grep -i "api.key\|authentication"

# PM2
pm2 logs evolution-api | grep -i "api.key"

# Systemd
journalctl -u evolution-api | grep -i "api.key"
```

### Verificar Configuração

```bash
# Se a API está rodando, verifique as variáveis
docker exec evolution-api env | grep API_KEY

# Ou no processo
ps aux | grep evolution
```

---

## 🔧 Se você precisa GERAR uma nova API Key

### Opção 1: Editar arquivo `.env`

1. **Abra o arquivo `.env`** da Evolution API
2. **Localize ou adicione:**
   ```env
   AUTHENTICATION_TYPE=apikey
   AUTHENTICATION_API_KEY=sua-nova-chave-aqui
   ```
3. **Gere uma chave segura** (veja abaixo)
4. **Reinicie a Evolution API**

### Opção 2: Gerar Chave Segura

**Windows (PowerShell):**
```powershell
# Gera uma chave aleatória de 32 caracteres
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

**Linux/Mac:**
```bash
# Gera uma chave aleatória
openssl rand -hex 32
```

**Node.js:**
```javascript
require('crypto').randomBytes(32).toString('hex')
```

**Python:**
```python
import secrets
secrets.token_hex(32)
```

**Online:**
- https://randomkeygen.com/
- Gere uma chave de 64 caracteres (32 bytes em hex)

### Opção 3: Formato da Chave

A Evolution API aceita diferentes formatos:

```
✅ Formato 1: Chave simples
AUTHENTICATION_API_KEY=minha-chave-secreta-123

✅ Formato 2: UUID
AUTHENTICATION_API_KEY=B6D9F2A3-4C8E-4B3A-9F2D-1E5C7A8B9D4F

✅ Formato 3: Hexadecimal
AUTHENTICATION_API_KEY=4f8d3c2a1b5e4a9c8d7f3e6b2a1c4d5f

✅ Formato 4: Base64
AUTHENTICATION_API_KEY=T2RkM2MyYTFiNWU0YTljOGQ3ZjNlNmIyYTFjNGQ1Zg==
```

**Recomendação:** Use uma chave longa e aleatória (mínimo 32 caracteres).

---

## 🔍 Como Verificar se a API Key Está Correta

### Teste 1: Requisição Manual

**Com curl:**
```bash
curl -H "apikey: sua-api-key" \
     https://sua-api.com/instance/fetchInstances
```

**Com Postman:**
1. Nova requisição GET
2. URL: `https://sua-api.com/instance/fetchInstances`
3. Headers:
   - Key: `apikey`
   - Value: `sua-api-key`
4. Enviar

**Resultado esperado:**
- ✅ **200 OK** com JSON = API Key correta
- ❌ **401 Unauthorized** = API Key incorreta
- ❌ **403 Forbidden** = API Key sem permissão

### Teste 2: No EvoConnect

1. Configure a API Key no EvoConnect
2. Tente conectar uma instância
3. Veja o console (F12):
   - ✅ Sem erros 401 = API Key correta
   - ❌ Erro 401 = API Key incorreta

---

## 📝 Exemplo Completo de Configuração

### Arquivo `.env` Completo

```env
# Evolution API Configuration

# Server
SERVER_URL=https://evolution.suaempresa.com
PORT=8080

# Authentication
AUTHENTICATION_TYPE=apikey
AUTHENTICATION_API_KEY=B6D9F2A3-4C8E-4B3A-9F2D-1E5C7A8B9D4F

# Database (opcional)
DATABASE_ENABLED=true
DATABASE_PROVIDER=postgresql

# CORS (importante para EvoConnect)
CORS_ORIGIN=https://seu-usuario.github.io
CORS_CREDENTIALS=true

# Logs
LOG_LEVEL=info
```

### docker-compose.yml Completo

```yaml
version: '3.8'

services:
  evolution-api:
    image: atendai/evolution-api:latest
    container_name: evolution-api
    restart: always
    ports:
      - "8080:8080"
    environment:
      - SERVER_URL=https://evolution.suaempresa.com
      - AUTHENTICATION_TYPE=apikey
      - AUTHENTICATION_API_KEY=B6D9F2A3-4C8E-4B3A-9F2D-1E5C7A8B9D4F
      - CORS_ORIGIN=https://seu-usuario.github.io
      - CORS_CREDENTIALS=true
    volumes:
      - evolution_data:/evolution/store
```

---

## ⚠️ Problemas Comuns

### ❌ "API Key não encontrada"

**Soluções:**
1. Verifique se o arquivo `.env` existe
2. Verifique se a variável está escrita corretamente
3. Verifique se não tem espaços extras
4. Reinicie a Evolution API após alterar

### ❌ "API Key inválida" (Erro 401)

**Soluções:**
1. Copie a chave novamente (pode ter espaços)
2. Verifique se está no formato correto
3. Gere uma nova chave se necessário
4. Verifique se está usando o header correto: `apikey`

### ❌ "API Key não funciona no EvoConnect"

**Soluções:**
1. Verifique se copiou corretamente (sem espaços)
2. Teste manualmente com curl/Postman primeiro
3. Verifique se o header está correto (`apikey`)
4. Veja o console do navegador (F12) para erros

### ❌ "Não sei onde está minha API Key"

**Soluções:**
1. Se você instalou: Procure no `.env` ou `docker-compose.yml`
2. Se é cliente: Peça ao administrador
3. Se é cloud: Veja no painel do provedor
4. Se não encontrar: Gere uma nova (veja acima)

---

## 🔐 Segurança da API Key

### ⚠️ IMPORTANTE: Proteja sua API Key!

1. **Nunca compartilhe publicamente**
   - Não coloque em screenshots
   - Não compartilhe em fóruns públicos
   - Não commite no Git (use `.gitignore`)

2. **Use chaves diferentes**
   - Uma para desenvolvimento
   - Outra para produção
   - Rotacione periodicamente

3. **Se a chave vazar:**
   - Gere uma nova imediatamente
   - Revogue a chave antiga
   - Verifique logs de acesso suspeitos

4. **Armazenamento:**
   - No EvoConnect: Fica no LocalStorage do navegador (seguro)
   - Na Evolution API: Arquivo `.env` (proteja com permissões)

---

## 📋 Checklist: Configurando API Key

```
□ Encontrei onde está a API Key
  └─ [ ] Arquivo .env
  └─ [ ] docker-compose.yml
  └─ [ ] Painel cloud
  └─ [ ] Variável de ambiente

□ Copiei a API Key corretamente
  └─ [ ] Sem espaços extras
  └─ [ ] Formato correto
  └─ [ ] Completa (não cortada)

□ Testei a API Key
  └─ [ ] Funciona com curl/Postman
  └─ [ ] Retorna 200 OK
  └─ [ ] Não retorna 401

□ Configurei no EvoConnect
  └─ [ ] URL da API correta
  └─ [ ] API Key inserida
  └─ [ ] Configurações salvas

□ Testei conexão
  └─ [ ] Sem erros 401
  └─ [ ] QR Code é gerado
  └─ [ ] Conexão funciona
```

---

## 🆘 Ainda Não Encontrou?

### Se você instalou a Evolution API:

1. **Verifique a documentação oficial:**
   - https://doc.evolution-api.com
   - Procure por "authentication" ou "api key"

2. **Veja os logs:**
   ```bash
   docker logs evolution-api
   # Procure por mensagens sobre autenticação
   ```

3. **Verifique o código:**
   - Se tem acesso ao código fonte
   - Procure por `AUTHENTICATION_API_KEY`

### Se você é cliente:

1. **Contate o administrador:**
   - Peça a API Key
   - Ou peça para gerar uma nova

2. **Verifique o painel:**
   - Se há um painel web
   - Procure em "Configurações" ou "API"

3. **Documentação do provedor:**
   - Consulte a documentação do serviço
   - Veja como obter credenciais

---

## 🔗 Links Úteis

- 📖 [Documentação Evolution API](https://doc.evolution-api.com)
- 🔧 [Troubleshooting](TROUBLESHOOTING.md)
- ⚙️ [Exemplos de Configuração](EXAMPLE_CONFIG.md)
- ❓ [FAQ](FAQ.md)

---

## 💡 Dica Final

**Se você não tem certeza de onde está a API Key:**

1. **Gere uma nova** (veja seção "Gerar Chave Segura" acima)
2. **Configure na Evolution API** (arquivo `.env`)
3. **Reinicie a API**
4. **Use a nova chave no EvoConnect**

Isso garante que você tem uma chave válida e sabe onde ela está! 🎯

---

<div align="center">
  <p><strong>API Key configurada? 🎉 Agora é só usar o EvoConnect!</strong></p>
  <p>Dúvidas? Veja o <a href="QUICK_START.md">Guia Rápido</a> ou <a href="FAQ.md">FAQ</a></p>
</div>

