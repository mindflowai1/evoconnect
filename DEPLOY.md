# 🚀 Guia de Deploy - EvoConnect

Este guia detalha como fazer o deploy do EvoConnect no GitHub Pages e outras plataformas.

## 📋 Pré-requisitos

- Conta no GitHub
- Evolution API configurada e acessível
- API Key da Evolution API

## 🌐 Deploy no GitHub Pages (Recomendado)

### Passo 1: Preparar o Repositório

1. **Crie um novo repositório no GitHub** ou faça fork deste projeto
2. **Clone o repositório** para sua máquina:
   ```bash
   git clone https://github.com/seu-usuario/evoconnect.git
   cd evoconnect
   ```

3. **Adicione os arquivos** (se criou um repo novo):
   ```bash
   git add .
   git commit -m "Initial commit - EvoConnect"
   git push origin main
   ```

### Passo 2: Configurar GitHub Pages

1. Acesse seu repositório no GitHub
2. Vá em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source** (Fonte):
   - Branch: `main`
   - Folder: `/ (root)`
5. Clique em **Save** (Salvar)

### Passo 3: Aguardar Deploy

- O GitHub Pages levará alguns minutos para fazer o deploy
- Uma mensagem aparecerá com a URL: `https://seu-usuario.github.io/evoconnect/`
- Acesse a URL para verificar

### Passo 4: Domínio Personalizado (Opcional)

1. Em **Settings > Pages > Custom domain**
2. Digite seu domínio (ex: `evoconnect.suaempresa.com`)
3. Configure o DNS do seu domínio:
   ```
   Tipo: CNAME
   Nome: evoconnect (ou seu subdomínio)
   Valor: seu-usuario.github.io
   ```
4. Aguarde a propagação do DNS (até 24h)

## 🔧 Configuração de CORS

### Problema de CORS

Se você receber erros de CORS no console:

```
Access to fetch at 'https://sua-api.com' from origin 'https://seu-usuario.github.io' 
has been blocked by CORS policy
```

### Solução: Configurar Evolution API

Você precisa configurar CORS na sua Evolution API:

#### Opção 1: Evolution API com Express.js

Adicione no arquivo principal da API:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://seu-usuario.github.io',
    'http://localhost:8000', // Para desenvolvimento
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'apikey', 'Authorization']
}));
```

#### Opção 2: Evolution API com Nginx

Se sua API usa Nginx como proxy, adicione ao arquivo de configuração:

```nginx
location / {
    add_header 'Access-Control-Allow-Origin' 'https://seu-usuario.github.io' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Content-Type, apikey, Authorization' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;

    if ($request_method = 'OPTIONS') {
        return 204;
    }

    proxy_pass http://localhost:8080;
}
```

#### Opção 3: Evolution API com Docker

Se usa Docker, adicione variáveis de ambiente:

```yaml
environment:
  - CORS_ORIGIN=https://seu-usuario.github.io
  - CORS_CREDENTIALS=true
```

## 🌍 Deploy em Outras Plataformas

### Vercel

1. **Instale o Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Faça login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Acesse a URL** fornecida pelo Vercel

### Netlify

#### Via Interface Web:

1. Acesse [Netlify](https://app.netlify.com)
2. Clique em **"New site from Git"**
3. Conecte seu repositório GitHub
4. Deixe as configurações padrão
5. Clique em **"Deploy site"**

#### Via Netlify CLI:

```bash
# Instalar CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Cloudflare Pages

1. Acesse [Cloudflare Pages](https://pages.cloudflare.com)
2. Clique em **"Create a project"**
3. Conecte seu repositório GitHub
4. Configure:
   - Build command: (deixe vazio)
   - Build output directory: `/`
5. Clique em **"Save and Deploy"**

### Firebase Hosting

1. **Instale Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**:
   ```bash
   firebase login
   ```

3. **Inicialize**:
   ```bash
   firebase init hosting
   ```
   - Escolha: Use an existing project
   - Public directory: `.` (diretório atual)
   - Single-page app: No

4. **Deploy**:
   ```bash
   firebase deploy
   ```

## 🔐 Segurança

### API Key Protection

⚠️ **IMPORTANTE**: A API Key é armazenada no LocalStorage do navegador do usuário.

**Boas práticas**:

1. **Cada cliente deve ter sua própria API Key**
2. **Nunca compartilhe API Keys** em screenshots ou documentação
3. **Rotacione API Keys** periodicamente
4. **Use HTTPS** sempre em produção
5. **Limite permissões** da API Key ao mínimo necessário

### HTTPS

- **GitHub Pages**: HTTPS automático
- **Domínio personalizado**: Configure certificado SSL
- **Outras plataformas**: Geralmente incluem SSL gratuito

## 🧪 Testar Antes do Deploy

### Servidor Local

Teste localmente antes de fazer deploy:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve -l 8000

# PHP
php -S localhost:8000
```

Acesse: `http://localhost:8000`

### Checklist de Testes

- [ ] Configuração da API salva corretamente
- [ ] QR Code é gerado
- [ ] Conexão é detectada automaticamente
- [ ] Instâncias conectadas aparecem na lista
- [ ] Botão de desconectar funciona
- [ ] Notificações aparecem corretamente
- [ ] Interface responsiva em mobile
- [ ] Sem erros no console do navegador

## 🔄 Atualizações

### Atualizar GitHub Pages

```bash
# Fazer alterações nos arquivos
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

O GitHub Pages fará deploy automaticamente em alguns minutos.

### Atualizar Outras Plataformas

**Vercel/Netlify/Cloudflare**: Deploy automático ao fazer push no GitHub

**Firebase**:
```bash
firebase deploy
```

## 📊 Monitoramento

### GitHub Pages Status

Verifique o status em:
- **Settings > Pages**: Veja o status do último deploy
- **Actions**: Veja o workflow de deploy

### Analytics (Opcional)

Adicione Google Analytics editando `index.html`:

```html
<!-- No final do <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=SEU-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'SEU-ID');
</script>
```

## 🆘 Troubleshooting

### Deploy não funciona

1. Verifique se os arquivos estão no root do repositório
2. Confirme que a branch está correta (main ou master)
3. Veja logs em **Actions** para erros

### Página em branco

1. Abra o Console do navegador (F12)
2. Verifique erros de JavaScript
3. Confirme que todos os arquivos foram carregados

### CORS ainda bloqueado

1. Verifique se configurou CORS na Evolution API
2. Teste a API com Postman/Insomnia
3. Veja se o domínio está correto nas configurações CORS

### 404 ao recarregar página

GitHub Pages pode ter problemas com SPAs. Como EvoConnect é uma single page, isso não deve ocorrer.

## 📱 PWA (Progressive Web App) - Futuro

Para transformar em PWA:

1. Adicione `manifest.json`
2. Adicione Service Worker
3. Configure cache offline
4. Adicione ícones e splash screens

---

## 🎉 Deploy Completo!

Após seguir este guia, seu EvoConnect estará online e pronto para uso!

**URL de exemplo**: `https://seu-usuario.github.io/evoconnect/`

**Próximos passos**:
1. Configure sua Evolution API
2. Teste a conexão
3. Compartilhe com seus clientes
4. Monitore o uso

---

<div align="center">
  <p>📚 Mais ajuda? Veja o <a href="README.md">README principal</a></p>
  <p>🐛 Problemas? Abra uma <a href="https://github.com/seu-usuario/evoconnect/issues">Issue</a></p>
</div>

