# 📝 Exemplos de Configuração - EvoConnect

Este documento fornece exemplos de configuração para diferentes cenários de uso da Evolution API.

## 🔧 Configurações Básicas

### Exemplo 1: Evolution API Local

```
URL da API: http://localhost:8080
API Key: sua-chave-api-local
```

**Uso**: Desenvolvimento e testes locais

### Exemplo 2: Evolution API em Servidor

```
URL da API: https://evolution.suaempresa.com
API Key: B6D9F2A3-4C8E-4B3A-9F2D-1E5C7A8B9D4F
```

**Uso**: Ambiente de produção

### Exemplo 3: Evolution API com Subdomínio

```
URL da API: https://whatsapp-api.empresa.com.br
API Key: 4f8d3c2a-1b5e-4a9c-8d7f-3e6b2a1c4d5f
```

**Uso**: API dedicada em subdomínio

## 📱 Exemplos de Nomes de Instância

### Formato Recomendado

Use nomes descritivos e sem espaços:

✅ **Bons exemplos**:
- `empresa-principal`
- `atendimento-01`
- `vendas-brasil`
- `suporte-tecnico`
- `marketing-whatsapp`
- `cliente-123`

❌ **Evite**:
- `Minha Instância` (espaços)
- `instância#1` (caracteres especiais)
- `WhatsApp/Vendas` (barras)
- `test@empresa` (@ pode causar problemas)

### Convenções de Nomenclatura

#### Por Departamento
```
financeiro-01
rh-principal
ti-suporte
vendas-sp
```

#### Por Cliente
```
cliente-empresa-a
cliente-empresa-b
cliente-joao-silva
```

#### Por Função
```
atendimento-automatico
bot-vendas
notificacoes-sistema
integracao-crm
```

## 🌐 Configurações de Rede

### CORS - Backend Node.js/Express

```javascript
// server.js ou app.js
const express = require('express');
const cors = require('cors');

const app = express();

// Configuração CORS para EvoConnect
const corsOptions = {
  origin: [
    'https://seu-usuario.github.io',
    'https://evoconnect.suaempresa.com',
    'http://localhost:8000' // Para desenvolvimento
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'apikey', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Resto da configuração...
```

### CORS - Nginx

```nginx
# /etc/nginx/sites-available/evolution-api

server {
    listen 80;
    server_name evolution.suaempresa.com;

    # Redirecionar para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name evolution.suaempresa.com;

    # Certificado SSL
    ssl_certificate /etc/letsencrypt/live/evolution.suaempresa.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/evolution.suaempresa.com/privkey.pem;

    location / {
        # CORS Headers
        add_header 'Access-Control-Allow-Origin' '$http_origin' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, apikey, Authorization' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;

        # Handle preflight requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '$http_origin' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Content-Type, apikey, Authorization' always;
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
            return 204;
        }

        # Proxy para Evolution API
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### CORS - Apache

```apache
# .htaccess ou configuração do VirtualHost

<IfModule mod_headers.c>
    # Permite requisições de qualquer origem (ou especifique o domínio)
    Header set Access-Control-Allow-Origin "*"
    
    # Ou especifique domínios específicos:
    # Header set Access-Control-Allow-Origin "https://seu-usuario.github.io"
    
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, apikey, Authorization"
    Header set Access-Control-Allow-Credentials "true"
</IfModule>

# Handle preflight requests
RewriteEngine On
RewriteCond %{REQUEST_METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [R=200,L]
```

## 🐳 Docker - Evolution API

### docker-compose.yml

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
      # API Configuration
      - SERVER_URL=https://evolution.suaempresa.com
      - CORS_ORIGIN=https://seu-usuario.github.io,http://localhost:8000
      - CORS_CREDENTIALS=true
      
      # API Key
      - AUTHENTICATION_API_KEY=B6D9F2A3-4C8E-4B3A-9F2D-1E5C7A8B9D4F
      
      # Database (opcional)
      - DATABASE_ENABLED=true
      - DATABASE_PROVIDER=postgresql
      - DATABASE_CONNECTION_URI=postgresql://user:password@postgres:5432/evolution
      
      # Webhook (opcional)
      - WEBHOOK_GLOBAL_ENABLED=false
      
      # Logs
      - LOG_LEVEL=info
      - LOG_COLOR=true
      
    volumes:
      - evolution_data:/evolution/store
      - evolution_instances:/evolution/instances

  # Nginx Proxy (opcional)
  nginx:
    image: nginx:alpine
    container_name: evolution-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - evolution-api

volumes:
  evolution_data:
  evolution_instances:
```

### Variáveis de Ambiente Importantes

```bash
# .env para Evolution API

# URL do servidor
SERVER_URL=https://evolution.suaempresa.com

# CORS
CORS_ORIGIN=https://seu-usuario.github.io,http://localhost:8000
CORS_CREDENTIALS=true

# Autenticação
AUTHENTICATION_TYPE=apikey
AUTHENTICATION_API_KEY=sua-chave-super-secreta

# Instâncias
INSTANCE_EXPIRATION_TIME=false
INSTANCE_QR_CODE_LIMIT=30

# Webhook (opcional)
WEBHOOK_GLOBAL_ENABLED=false
WEBHOOK_GLOBAL_URL=https://seu-webhook.com/evolution

# Database (opcional - recomendado para produção)
DATABASE_ENABLED=true
DATABASE_PROVIDER=postgresql
DATABASE_CONNECTION_URI=postgresql://user:pass@localhost:5432/evolution

# Storage (opcional - para salvar sessões)
STORAGE_PROVIDER=local
# ou
STORAGE_PROVIDER=s3
STORAGE_S3_BUCKET=evolution-bucket
STORAGE_S3_ACCESS_KEY=sua-access-key
STORAGE_S3_SECRET_KEY=sua-secret-key
```

## 🔐 Segurança

### Gerar API Key Segura

```bash
# Linux/Mac
openssl rand -hex 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Python
python -c "import secrets; print(secrets.token_hex(32))"

# PowerShell
[System.Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Exemplo de API Key Forte

```
B6D9F2A3-4C8E-4B3A-9F2D-1E5C7A8B9D4F2E3A1C5D7F9B4E6A8C2D4F6A8B0D2E4F
```

### Rotação de API Keys

1. Gere uma nova API Key
2. Atualize na Evolution API
3. Atualize nas configurações do EvoConnect
4. Revogue a chave antiga após 24h

## 🧪 Testando a Configuração

### Testar Conectividade

```bash
# Testar se API está acessível
curl https://evolution.suaempresa.com

# Testar com API Key
curl -H "apikey: sua-api-key" \
     https://evolution.suaempresa.com/instance/fetchInstances
```

### Testar CORS

```bash
# Testar preflight (OPTIONS)
curl -X OPTIONS \
     -H "Origin: https://seu-usuario.github.io" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: apikey" \
     -v https://evolution.suaempresa.com/instance/fetchInstances
```

Procure por headers na resposta:
- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`

## 📊 Monitoramento

### Health Check

Adicione endpoint de health check:

```bash
# Verificar status da API
curl https://evolution.suaempresa.com/health

# Com autenticação
curl -H "apikey: sua-api-key" \
     https://evolution.suaempresa.com/health
```

### Logs

```bash
# Docker
docker logs evolution-api -f

# PM2
pm2 logs evolution-api

# Systemd
journalctl -u evolution-api -f
```

## 🚀 Otimizações

### Cache

```nginx
# Nginx - cache para melhor performance
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Compressão

```nginx
# Nginx - habilitar gzip
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
```

### Rate Limiting

```nginx
# Nginx - limitar requisições
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

location / {
    limit_req zone=api_limit burst=20;
    # ... resto da configuração
}
```

---

## 📞 Suporte

Dúvidas sobre configuração?

- 📧 Email: suporte@suaempresa.com
- 📚 Documentação: [Evolution API Docs](https://doc.evolution-api.com)
- 💬 Issues: [GitHub Issues](https://github.com/seu-usuario/evoconnect/issues)

---

<div align="center">
  <p>🔧 Configuração completa! Agora é só usar o EvoConnect!</p>
</div>


