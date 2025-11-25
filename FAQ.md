# ❓ FAQ - Perguntas Frequentes

Respostas para as dúvidas mais comuns sobre o EvoConnect.

## 📱 Sobre WhatsApp e Conexões

### ❓ Quantas instâncias posso conectar?

Você pode conectar quantas instâncias quiser no EvoConnect. Porém, o WhatsApp limita a **4 dispositivos conectados simultaneamente** por número. A Evolution API gerencia cada instância separadamente.

### ❓ Preciso manter o WhatsApp aberto no celular?

Não! Após escanear o QR Code e conectar, você pode fechar o WhatsApp no celular. A conexão permanecerá ativa através da Evolution API.

### ❓ O QR Code expirou, o que fazer?

O QR Code expira após alguns minutos por segurança. Simplesmente:
1. Clique em "Cancelar"
2. Clique novamente em "Conectar WhatsApp"
3. Um novo QR Code será gerado

### ❓ Por que a conexão foi perdida?

Possíveis motivos:
- WhatsApp foi desconectado manualmente no celular
- Servidor da Evolution API foi reiniciado
- Problemas de rede/internet
- Número foi banido pelo WhatsApp (uso inadequado)

**Solução**: Reconecte usando o botão de reconexão ou gere um novo QR Code.

### ❓ Posso usar o mesmo número em múltiplas instâncias?

Não recomendado. Cada número do WhatsApp deve ter apenas uma instância ativa por vez. Conectar o mesmo número em múltiplas instâncias pode causar:
- Desconexões frequentes
- Conflitos de sessão
- Possível banimento pelo WhatsApp

## 🔧 Configuração e Uso

### ❓ Onde encontro a URL da Evolution API?

A URL é fornecida por quem configurou a Evolution API:
- Se você instalou: `http://seu-servidor:8080` ou seu domínio
- Se é cliente: Solicite ao administrador
- Exemplo: `https://evolution.suaempresa.com`

### ❓ Onde consigo a API Key?

A localização depende de como a Evolution API está instalada:

**Se você instalou:**
- Arquivo `.env`: Procure por `AUTHENTICATION_API_KEY`
- `docker-compose.yml`: Veja variáveis de ambiente
- Variáveis de sistema: `$AUTHENTICATION_API_KEY`

**Se você é cliente:**
- Solicite ao administrador
- Veja no painel do serviço (se houver)

**📖 Guia completo:** Veja [COMO_OBTER_API_KEY.md](COMO_OBTER_API_KEY.md) com todas as opções e como gerar uma nova chave.

### ❓ Minhas configurações são salvas onde?

As configurações (URL da API e API Key) são salvas no **LocalStorage** do seu navegador. Isso significa:
- ✅ Privacidade total - dados ficam apenas no seu computador
- ✅ Não precisa login/senha
- ⚠️ Se limpar dados do navegador, perderá as configurações
- ⚠️ Configurações não sincronizam entre dispositivos

### ❓ Outras pessoas podem ver minhas instâncias?

Não. Cada usuário vê apenas as instâncias que ele conectou. O EvoConnect não tem servidor próprio - é 100% client-side, rodando apenas no seu navegador.

## 🔐 Segurança

### ❓ É seguro usar o EvoConnect?

Sim! O EvoConnect:
- ✅ Não armazena dados em servidores externos
- ✅ Todas as configurações ficam no seu navegador
- ✅ Comunicação direta com sua Evolution API
- ✅ Código aberto - você pode auditar
- ✅ Usa HTTPS (quando hospedado corretamente)

**Importante**: A segurança depende também da sua Evolution API estar configurada corretamente.

### ❓ Alguém pode roubar minha API Key?

Sua API Key fica armazenada no LocalStorage do navegador. Riscos:
- ❌ Malware/vírus no computador
- ❌ Extensões maliciosas do navegador
- ❌ Acesso físico ao seu computador

**Proteção**:
- Use antivírus atualizado
- Instale apenas extensões confiáveis
- Não deixe computador desbloqueado
- Rotacione a API Key periodicamente

### ❓ O que fazer se minha API Key vazar?

1. Gere uma nova API Key na Evolution API
2. Atualize a chave no EvoConnect
3. Revogue/delete a chave antiga
4. Verifique logs de acesso suspeitos

### ❓ Posso usar em rede pública/Wi-Fi aberto?

Sim, desde que:
- ✅ Use HTTPS (cadeado verde no navegador)
- ✅ Evolution API também use HTTPS
- ⚠️ Evite redes muito suspeitas
- ⚠️ Use VPN para segurança extra

## 🌐 Deploy e Hospedagem

### ❓ GitHub Pages é grátis?

Sim! GitHub Pages é **100% gratuito** para repositórios públicos e privados. Sem limites de uso para sites estáticos.

### ❓ Preciso de servidor/backend?

Não! O EvoConnect é uma aplicação **client-side** (frontend puro):
- HTML, CSS e JavaScript
- Roda direto no navegador
- Não precisa de banco de dados
- Não precisa de linguagem backend (PHP, Python, Node.js)

Você só precisa de hospedagem estática.

### ❓ Posso usar domínio próprio?

Sim! Você pode configurar domínio personalizado:
- GitHub Pages: Configure em Settings > Pages > Custom domain
- Configure DNS: CNAME apontando para `seu-usuario.github.io`
- SSL/HTTPS: GitHub Pages fornece gratuitamente

Exemplo: `evoconnect.suaempresa.com`

### ❓ Como atualizar o site depois de modificar?

No GitHub Pages:
```bash
git add .
git commit -m "Atualização"
git push origin main
```

Deploy automático em 1-2 minutos!

## 🐛 Problemas Comuns

### ❓ Erro: "Configure a API primeiro"

Você precisa configurar URL e API Key:
1. Clique no botão "Configurações"
2. Preencha URL da Evolution API
3. Preencha API Key
4. Clique em "Salvar Configurações"

### ❓ Erro: "Blocked by CORS policy"

**Problema**: A Evolution API não permite requisições do EvoConnect.

**Solução**: Configure CORS na Evolution API para permitir seu domínio. Veja exemplos em [EXAMPLE_CONFIG.md](EXAMPLE_CONFIG.md).

### ❓ QR Code não aparece

Possíveis causas e soluções:

1. **API não responde**:
   - Verifique se URL está correta
   - Teste acessar a URL no navegador
   - Confirme que API está rodando

2. **API Key inválida**:
   - Confirme a API Key
   - Tente gerar nova key

3. **CORS bloqueado**:
   - Configure CORS na API
   - Veja console do navegador (F12)

4. **Instância já conectada**:
   - A instância pode já estar conectada
   - Desconecte primeiro ou use outro nome

### ❓ "Tempo Esgotado" ao conectar

O QR Code expira após 5 minutos. Se isso acontece:
1. Verifique sua conexão de internet
2. Gere um novo QR Code
3. Escaneie mais rapidamente
4. Confirme que o celular tem internet estável

### ❓ Página não carrega no GitHub Pages

Verifique:
1. GitHub Pages está habilitado? (Settings > Pages)
2. Branch correta selecionada? (main)
3. Aguardou alguns minutos após configurar?
4. URL está correta? (`seu-usuario.github.io/evoconnect/`)

### ❓ Console mostra erros JavaScript

Abra o Console (F12) e veja a mensagem de erro:

- **"apiUrl is not defined"**: Configure a API
- **"Failed to fetch"**: Problema de conexão/CORS
- **"Unexpected token"**: Arquivo corrompido - reinstale
- **"Cannot read property"**: Problema no código - relate o bug

## 💻 Personalização

### ❓ Posso mudar as cores?

Sim! Edite o arquivo `styles.css`:

```css
:root {
    --primary-color: #25D366;  /* Mude aqui */
    --secondary-color: #128C7E;
    /* ... */
}
```

### ❓ Posso trocar o logo?

Sim! Edite o `index.html` na seção `<div class="logo">` e substitua o SVG pelo seu logo.

### ❓ Posso adicionar minha marca?

Claro! Você pode:
- Trocar cores
- Mudar logo
- Alterar textos
- Adicionar footer com suas informações
- Personalizar mensagens

O código é **open source** - customize à vontade!

### ❓ Posso remover o nome "EvoConnect"?

Sim! É seu projeto agora. Apenas:
1. Mantenha a licença MIT
2. Dê créditos (opcional mas apreciado)
3. Não use para fins ilegais

## 📊 Performance e Limites

### ❓ Quantas pessoas podem usar simultaneamente?

Como é client-side, não há limite! Cada usuário:
- Acessa direto o GitHub Pages
- Conecta direto com sua própria Evolution API
- Não sobrecarrega nenhum servidor central

Limite real: capacidade da sua Evolution API.

### ❓ Há limite de requisições?

**GitHub Pages**: Soft limit de 100GB/mês de banda, mas é muito difícil alcançar com site estático.

**Evolution API**: Depende da configuração do seu servidor. Monitore recursos (CPU, RAM, Rede).

### ❓ O site é rápido?

Sim! Por ser apenas HTML/CSS/JS:
- Carregamento: < 1 segundo
- Sem banco de dados
- Sem processamento server-side
- Cache do navegador ajuda

## 🔄 Atualizações

### ❓ Como sei se há atualizações?

- ⭐ Star o repositório no GitHub
- 👀 Watch > Releases only
- Receberá notificações de novas versões

### ❓ Como atualizar minha versão?

1. **Se fez fork**: Sync fork no GitHub
2. **Se baixou**: Baixe novamente e substitua arquivos
3. **Suas configurações**: Não serão perdidas (estão no navegador)

### ❓ Minhas configurações serão perdidas?

Não! Suas configurações estão no **LocalStorage** do navegador, não nos arquivos. Pode atualizar tranquilamente.

## 🆘 Obtendo Ajuda

### ❓ Onde consigo suporte?

1. **Documentação**: Leia [README.md](README.md)
2. **Guia de Deploy**: Veja [DEPLOY.md](DEPLOY.md)
3. **Exemplos**: Veja [EXAMPLE_CONFIG.md](EXAMPLE_CONFIG.md)
4. **Issues**: [GitHub Issues](https://github.com/seu-usuario/evoconnect/issues)
5. **Comunidade**: Discord/Telegram da Evolution API

### ❓ Encontrei um bug, o que fazer?

1. Confirme que é um bug (não é erro de configuração)
2. Veja se já foi reportado nas Issues
3. Abra uma nova Issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Screenshots se possível
   - Erros do console (F12)
   - Navegador e versão

### ❓ Posso contribuir com o projeto?

**Sim, adoraríamos!** 🎉

1. Fork o repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Faça suas alterações
4. Commit: `git commit -m 'Adiciona nova feature'`
5. Push: `git push origin minha-feature`
6. Abra um Pull Request

### ❓ Posso usar comercialmente?

Sim! A licença MIT permite uso comercial. Você pode:
- ✅ Usar em projetos pessoais
- ✅ Usar em projetos comerciais
- ✅ Modificar o código
- ✅ Distribuir cópias
- ✅ Sublicenciar

Apenas mantenha a licença MIT nos arquivos.

## 🌍 Outros

### ❓ Funciona em mobile?

Sim! O EvoConnect é totalmente responsivo:
- ✅ Smartphones (iOS, Android)
- ✅ Tablets
- ✅ Desktop

### ❓ Preciso de conhecimento técnico?

Para **usar**: Não! Interface intuitiva.

Para **instalar no GitHub Pages**: Conhecimento básico de Git.

Para **personalizar**: Conhecimento de HTML/CSS/JS.

### ❓ Qual navegador devo usar?

Recomendado:
- ✅ Google Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Evite: Internet Explorer (não suportado).

### ❓ Posso usar offline?

Não. O EvoConnect precisa:
- Internet para acessar Evolution API
- Internet para gerar QR Code
- Internet para verificar status de conexão

É uma aplicação web, não funciona offline.

---

## 🤔 Sua dúvida não está aqui?

1. 📖 Leia a [Documentação Completa](README.md)
2. 🔍 Pesquise nas [Issues do GitHub](https://github.com/seu-usuario/evoconnect/issues)
3. ❓ Abra uma nova Issue
4. 💬 Entre na comunidade Evolution API

---

<div align="center">
  <p><strong>Ainda com dúvidas? Estamos aqui para ajudar!</strong></p>
  <p>📧 Email: suporte@suaempresa.com</p>
</div>

