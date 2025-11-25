# 🚀 EvoConnect - Evolution API WhatsApp Connection Manager

Uma aplicação web moderna e profissional para gerenciar conexões de WhatsApp através da Evolution API. Interface intuitiva, responsiva e com excelente experiência do usuário.

![EvoConnect](https://img.shields.io/badge/Version-1.0.0-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-success)

## ✨ Características

- 🎨 **Interface Moderna**: Design profissional com gradientes e animações suaves
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🔄 **Conexão em Tempo Real**: Sistema de polling para verificação automática de status
- 🔔 **Notificações Inteligentes**: Feedback visual para todas as ações (sucesso, erro, aviso, info)
- 💾 **Armazenamento Local**: Salva configurações e instâncias conectadas no navegador
- 🔐 **Seguro**: Configuração de API Key protegida
- 🌐 **Deploy Simples**: Funciona 100% no GitHub Pages sem necessidade de backend

## 🎯 Funcionalidades

### 1. Configuração da API
- Configure a URL base da sua Evolution API
- Adicione sua chave de API (API Key)
- Configurações salvas localmente no navegador

### 2. Conexão de Instâncias
- Insira o nome da instância desejada
- QR Code gerado automaticamente
- Instruções passo a passo para conectar
- Verificação automática de conexão

### 3. Gerenciamento de Instâncias
- Visualize todas as instâncias conectadas
- Veja o status de cada instância (conectada/desconectada)
- Data e hora da última conexão
- Ações rápidas: verificar status, desconectar, remover

### 4. Feedback Visual
- Mensagens de sucesso ao conectar
- Alertas de erro com detalhes do problema
- Avisos de timeout ou QR code expirado
- Informações sobre o processo de conexão

## 🚀 Como Usar

### Passo 1: Configure a Evolution API

1. Clique no botão **"Configurações"** no canto superior direito
2. Insira a **URL da sua Evolution API** (ex: `https://evolution.suaempresa.com`)
3. Insira sua **API Key** fornecida pela Evolution API
   - 🔑 **Não sabe onde encontrar?** Veja: [COMO_OBTER_API_KEY.md](COMO_OBTER_API_KEY.md)
4. Clique em **"Salvar Configurações"**

### Passo 2: Conectar uma Instância

1. Digite o **nome da instância** no campo indicado
2. Clique em **"Conectar WhatsApp"**
3. Aguarde o **QR Code** ser gerado
4. Abra o WhatsApp no seu celular
5. Vá em **Menu > Aparelhos conectados**
6. Toque em **"Conectar um aparelho"**
7. **Escaneie o QR Code** exibido na tela
8. Aguarde a confirmação de conexão

### Passo 3: Gerenciar Instâncias

- **Verificar Status**: Clique no botão 🔄 para verificar se a instância está conectada
- **Desconectar**: Clique no botão 🔌 para desconectar a instância
- **Remover**: Clique no botão 🗑️ para remover da lista

## 📦 Instalação

### Opção 1: GitHub Pages (Recomendado)

1. **Faça um fork** deste repositório
2. Vá em **Settings > Pages** do seu repositório
3. Em **Source**, selecione a branch **main** e pasta **/ (root)**
4. Clique em **Save**
5. Aguarde alguns minutos e acesse: `https://seu-usuario.github.io/evoconnect/`

### Opção 2: Hospedagem Local

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/evoconnect.git
cd evoconnect
```

2. Abra o arquivo `index.html` no navegador ou use um servidor local:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

3. Acesse: `http://localhost:8000`

### Opção 3: Outras Plataformas

O EvoConnect pode ser hospedado em qualquer plataforma de hospedagem estática:
- **Vercel**: Conecte seu repositório e faça deploy automático
- **Netlify**: Arraste e solte os arquivos ou conecte o repositório
- **Cloudflare Pages**: Deploy direto do GitHub
- **Firebase Hosting**: Use o Firebase CLI para deploy

## 🔧 Configuração da Evolution API

### Endpoints Suportados

O EvoConnect é compatível com diferentes versões da Evolution API e tenta automaticamente vários endpoints:

#### Conexão/QR Code:
- `/instance/connect/{instanceName}`
- `/instance/qrcode/{instanceName}`
- `/instance/qr/{instanceName}`

#### Verificação de Status:
- `/instance/connectionState/{instanceName}`
- `/instance/status/{instanceName}`
- `/instance/{instanceName}`

#### Desconexão:
- `/instance/logout/{instanceName}`
- `/instance/disconnect/{instanceName}`
- `/instance/delete/{instanceName}`

### Requisitos da API

1. **CORS habilitado**: A Evolution API deve permitir requisições do domínio onde o EvoConnect está hospedado
2. **HTTPS recomendado**: Para produção, use sempre HTTPS
3. **API Key válida**: Necessária para autenticação

### Exemplo de Configuração CORS (Evolution API)

Se você controla a Evolution API, adicione estas configurações:

```javascript
// Express.js
app.use(cors({
  origin: ['https://seu-usuario.github.io', 'http://localhost:8000'],
  credentials: true
}));
```

## 🎨 Personalização

### Cores

Edite as variáveis CSS em `styles.css`:

```css
:root {
    --primary-color: #25D366;      /* Verde WhatsApp */
    --primary-dark: #1faa52;       /* Verde escuro */
    --secondary-color: #128C7E;    /* Verde secundário */
    --danger-color: #dc3545;       /* Vermelho */
    --success-color: #28a745;      /* Verde sucesso */
    /* ... mais cores ... */
}
```

### Logo

Substitua o SVG no arquivo `index.html` na seção `<div class="logo">` pelo seu próprio logo.

### Título

Altere o título da página em `index.html`:

```html
<title>Seu Título - Conexão WhatsApp</title>
<h1>Seu Nome</h1>
```

## 🔒 Segurança

### Boas Práticas

1. **Nunca exponha sua API Key**: A API Key é armazenada apenas no LocalStorage do navegador
2. **Use HTTPS**: Sempre use conexões seguras em produção
3. **API Key por usuário**: Cada cliente deve ter sua própria API Key
4. **Rotação de chaves**: Considere rotacionar as API Keys periodicamente

### Armazenamento

- As configurações são salvas no **LocalStorage** do navegador
- Cada usuário mantém suas próprias configurações localmente
- Nenhum dado é enviado para servidores externos além da Evolution API configurada

## 🐛 Solução de Problemas

### QR Code não aparece

1. Verifique se a URL da API está correta (sem `/` no final)
2. Confirme que a API Key está válida
3. Verifique se o CORS está habilitado na Evolution API
4. Abra o Console do navegador (F12) para ver erros detalhados

### Erro de CORS

```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Solução**: Configure CORS na sua Evolution API para permitir o domínio do EvoConnect.

### Conexão não detectada

1. O QR Code expira após 5 minutos - gere um novo
2. Verifique se escaneou o código correto
3. Confirme que o WhatsApp está conectado à internet
4. Tente reconectar através do botão de verificar status

### API não responde

1. Verifique se a URL está acessível (teste no navegador)
2. Confirme que a Evolution API está rodando
3. Verifique logs da API para erros
4. Teste a API Key usando ferramentas como Postman

## 📱 Compatibilidade

### Navegadores Suportados

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Dispositivos

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablet (iPad, Android)
- ✅ Mobile (iPhone, Android)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [Evolution API](https://evolution-api.com/) - API de WhatsApp
- [WhatsApp Web](https://web.whatsapp.com/) - Protocolo de comunicação
- Comunidade open source

## 📞 Suporte

Para questões e suporte:

- 📧 Email: suporte@suaempresa.com
- 💬 Issues: [GitHub Issues](https://github.com/seu-usuario/evoconnect/issues)
- 📚 Documentação: [Wiki](https://github.com/seu-usuario/evoconnect/wiki)

## 🗺️ Roadmap

- [ ] Suporte a múltiplas conexões simultâneas
- [ ] Dashboard com estatísticas
- [ ] Histórico de conexões
- [ ] Exportar/Importar configurações
- [ ] Tema escuro/claro
- [ ] Multi-idioma (EN, ES, PT)
- [ ] Notificações do navegador
- [ ] Integração com webhooks

---

<div align="center">
  <p>Feito com ❤️ por EvoConnect Team</p>
  <p>⭐ Star este repositório se ele te ajudou!</p>
</div>

