# 🧪 Como Testar Localmente - EvoConnect

Guia rápido para executar o EvoConnect no seu computador antes de fazer deploy.

## ⚡ Método Rápido (Recomendado)

### Opção 1: Python (Mais Simples) 🐍

**Windows/Mac/Linux:**

```bash
# 1. Abra o terminal na pasta do projeto
cd "c:\Gaveta 2\Projetos\evoconnect"

# 2. Execute o servidor Python
python -m http.server 8000

# 3. Abra no navegador:
# http://localhost:8000
```

**Se der erro "python não encontrado", tente:**
```bash
python3 -m http.server 8000
```

### Opção 2: Node.js (npx serve) 📦

```bash
# 1. Abra o terminal na pasta do projeto
cd "c:\Gaveta 2\Projetos\evoconnect"

# 2. Execute (não precisa instalar nada)
npx serve -l 8000

# 3. Abra no navegador:
# http://localhost:8000
```

### Opção 3: PHP 🐘

```bash
# 1. Abra o terminal na pasta do projeto
cd "c:\Gaveta 2\Projetos\evoconnect"

# 2. Execute
php -S localhost:8000

# 3. Abra no navegador:
# http://localhost:8000
```

### Opção 4: Abrir Direto no Navegador 🌐

**⚠️ Atenção**: Alguns recursos podem não funcionar devido a políticas CORS.

1. Navegue até a pasta do projeto
2. Clique duas vezes em `index.html`
3. O arquivo abrirá no navegador padrão

**URL será algo como:** `file:///C:/Gaveta%202/Projetos/evoconnect/index.html`

## 🎯 Passo a Passo Detalhado

### 1. Abrir Terminal/PowerShell

**Windows:**
- Pressione `Win + R`
- Digite `powershell` ou `cmd`
- Pressione Enter

**Ou:**
- Clique com botão direito na pasta do projeto
- Selecione "Abrir no Terminal" ou "Abrir no PowerShell"

### 2. Navegar até a Pasta

```bash
cd "c:\Gaveta 2\Projetos\evoconnect"
```

### 3. Escolher Método e Executar

Escolha um dos métodos acima (Python é o mais fácil).

### 4. Abrir no Navegador

Após executar o comando, você verá algo como:
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

Abra seu navegador e acesse: **http://localhost:8000**

## 🔧 Scripts Automatizados

### Windows (start.bat)

Crie um arquivo `start.bat` na pasta do projeto:

```batch
@echo off
echo Iniciando EvoConnect...
echo.
echo Acesse: http://localhost:8000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.
python -m http.server 8000
pause
```

**Para usar:**
- Clique duas vezes em `start.bat`
- Ou execute: `start.bat` no terminal

### Mac/Linux (start.sh)

Crie um arquivo `start.sh` na pasta do projeto:

```bash
#!/bin/bash
echo "🚀 Iniciando EvoConnect..."
echo ""
echo "📱 Acesse: http://localhost:8000"
echo ""
echo "⏹️  Pressione Ctrl+C para parar"
echo ""
python3 -m http.server 8000
```

**Para usar:**
```bash
chmod +x start.sh
./start.sh
```

## ✅ Verificar se Está Funcionando

1. **Servidor rodando**: Terminal mostra mensagem de servidor ativo
2. **Navegador**: Abre a página do EvoConnect
3. **Console**: Pressione F12 e veja se há erros
4. **Teste básico**: Clique em "Configurações" - deve abrir o painel

## 🐛 Problemas Comuns

### ❌ "python não é reconhecido"

**Solução:**
- Instale Python: https://www.python.org/downloads/
- Ou use: `python3 -m http.server 8000`
- Ou use outro método (Node.js, PHP)

### ❌ "Porta 8000 já está em uso"

**Solução:**
```bash
# Use outra porta (ex: 8080)
python -m http.server 8080
# Acesse: http://localhost:8080
```

### ❌ "Erro de CORS ao testar"

**Isso é normal!** Ao testar localmente com `file://`, pode haver problemas de CORS.

**Solução:**
- Use um servidor local (Python, Node.js, PHP)
- Não abra o arquivo diretamente no navegador
- Use `http://localhost:8000`

### ❌ "npx serve não funciona"

**Solução:**
- Instale Node.js: https://nodejs.org/
- Ou use outro método (Python é mais simples)

### ❌ "Página em branco"

**Verifique:**
1. Terminal mostra servidor rodando?
2. URL está correta? (`http://localhost:8000`)
3. Abra Console (F12) e veja erros
4. Todos os arquivos estão na mesma pasta?

## 🎯 Testando a Funcionalidade

### 1. Teste Básico
- [ ] Página carrega corretamente
- [ ] Botão "Configurações" abre o painel
- [ ] Campos de formulário funcionam
- [ ] Botões respondem ao clique

### 2. Teste de Configuração
- [ ] Salvar URL da API funciona
- [ ] Salvar API Key funciona
- [ ] Configurações persistem após recarregar

### 3. Teste de Conexão (Requer Evolution API)
- [ ] Conectar instância gera QR Code
- [ ] QR Code aparece na tela
- [ ] Status é verificado automaticamente
- [ ] Conexão bem-sucedida mostra notificação

## 📝 Checklist de Teste Local

```
✅ Ambiente:
□ Terminal/PowerShell aberto
□ Navegado até a pasta do projeto
□ Servidor local rodando
□ Navegador aberto em http://localhost:8000

✅ Interface:
□ Página carrega sem erros
□ Estilos CSS aplicados corretamente
□ JavaScript funciona (F12 sem erros)
□ Botões e formulários funcionam

✅ Funcionalidades:
□ Configurações salvam corretamente
□ QR Code é gerado (se API configurada)
□ Notificações aparecem
□ Lista de instâncias funciona

✅ Responsividade:
□ Teste em diferentes tamanhos de tela
□ Mobile funciona (F12 > Device Toolbar)
□ Tablet funciona
```

## 🚀 Próximos Passos

Após testar localmente:

1. **Se tudo funcionar**: Faça deploy no GitHub Pages
2. **Se encontrar bugs**: Corrija antes de fazer deploy
3. **Se precisar personalizar**: Edite os arquivos e teste novamente

## 💡 Dicas

### Desenvolvimento Rápido

**Atalhos úteis:**
- `Ctrl + R` ou `F5`: Recarregar página
- `Ctrl + Shift + R`: Recarregar sem cache
- `F12`: Abrir DevTools (Console, Network, etc)
- `Ctrl + C`: Parar servidor no terminal

### Hot Reload (Opcional)

Para recarregar automaticamente ao editar arquivos:

**Com Python:**
```bash
# Instale watchdog
pip install watchdog

# Execute com auto-reload
watchmedo auto-restart --patterns="*.html;*.css;*.js" --recursive -- python -m http.server 8000
```

**Com Node.js (Live Server):**
```bash
npx live-server --port=8000
```

### Testar em Dispositivos Móveis

1. Descubra seu IP local:
   ```bash
   # Windows
   ipconfig
   # Procure por "IPv4 Address" (ex: 192.168.1.100)
   
   # Mac/Linux
   ifconfig
   # Procure por "inet" (ex: 192.168.1.100)
   ```

2. Inicie servidor acessível na rede:
   ```bash
   python -m http.server 8000 --bind 0.0.0.0
   ```

3. No celular (mesma rede Wi-Fi):
   - Acesse: `http://192.168.1.100:8000`
   - Substitua pelo seu IP

## 📚 Recursos Adicionais

- **DevTools**: Aprenda a usar F12 para debug
- **Network Tab**: Veja requisições à API
- **Console**: Veja erros e logs
- **Application Tab**: Veja LocalStorage (suas configurações)

---

## 🎉 Pronto para Testar!

Escolha um método acima e comece a testar!

**Método mais rápido:**
```bash
cd "c:\Gaveta 2\Projetos\evoconnect"
python -m http.server 8000
```

Depois acesse: **http://localhost:8000** 🚀

---

<div align="center">
  <p>❓ Dúvidas? Veja o <a href="README.md">README</a> ou <a href="FAQ.md">FAQ</a></p>
</div>


