# 🔧 Troubleshooting - Resolução de Problemas

Guia completo para resolver os problemas mais comuns do EvoConnect.

## ❌ Erro: "Unexpected token '<', "<!doctype "... is not valid JSON"

### O que significa?

A Evolution API está retornando **HTML** em vez de **JSON**. Isso geralmente acontece quando:

1. ❌ **URL da API está incorreta**
   - Exemplo: `https://sua-api.com` quando deveria ser `https://sua-api.com/api`
   - Ou: URL aponta para uma página web em vez da API

2. ❌ **Endpoint não existe**
   - A Evolution API pode ter endpoints diferentes
   - Versão da API pode ser diferente

3. ❌ **Problema de CORS**
   - CORS mal configurado retorna página de erro HTML

### ✅ Soluções

#### 1. Verificar URL da API

**Teste manualmente:**

Abra no navegador (ou Postman):
```
https://sua-url-api.com/instance/fetchInstances
```

**O que você deve ver:**
- ✅ JSON com dados das instâncias
- ❌ HTML (página de erro) = URL está errada

**URLs comuns da Evolution API:**
```
✅ Correto: https://evolution.suaempresa.com
✅ Correto: https://api.suaempresa.com/evolution
✅ Correto: http://localhost:8080

❌ Errado: https://evolution.suaempresa.com/
❌ Errado: https://suaempresa.com (sem /evolution)
❌ Errado: evolution.suaempresa.com (sem http://)
```

#### 2. Verificar Endpoints

A Evolution API pode ter diferentes versões. Teste qual endpoint funciona:

**Opção A - Teste no navegador:**
```
https://sua-api.com/instance/fetchInstances
```

**Opção B - Teste com curl:**
```bash
curl -H "apikey: sua-api-key" \
     https://sua-api.com/instance/fetchInstances
```

**Opção C - Teste QR Code endpoint:**
```
https://sua-api.com/instance/connect/teste
```

#### 3. Verificar CORS

**Sintoma:** Erro de CORS no console

**Solução:** Configure CORS na Evolution API. Veja [EXAMPLE_CONFIG.md](EXAMPLE_CONFIG.md)

---

## ❌ Erro: "Nome da instância com espaços"

### Problema

Você digitou: `OnMe Joias` (com espaço)

### ✅ Solução Automática

O EvoConnect agora **sanitiza automaticamente** o nome:
- `OnMe Joias` → `onme-joias`
- `Minha Instância` → `minha-instancia`
- `Test@123` → `test123`

**Você verá um aviso:** "Nome da instância ajustado para: onme-joias"

### 💡 Dica

Use nomes sem espaços desde o início:
- ✅ `onme-joias`
- ✅ `minha-instancia`
- ✅ `teste-123`

---

## ❌ Erro: "Failed to fetch" ou "NetworkError"

### O que significa?

Não consegue conectar à API.

### ✅ Soluções

1. **Verificar se API está online:**
   ```bash
   # Teste no navegador
   https://sua-api.com
   
   # Ou com ping
   ping sua-api.com
   ```

2. **Verificar firewall:**
   - Firewall pode estar bloqueando
   - Verifique regras de firewall

3. **Verificar CORS:**
   - API precisa permitir seu domínio
   - Veja [EXAMPLE_CONFIG.md](EXAMPLE_CONFIG.md)

4. **Verificar URL:**
   - URL está correta?
   - Tem `http://` ou `https://`?
   - Não tem barra no final?

---

## ❌ Erro: "Erro HTTP 404"

### O que significa?

Endpoint não encontrado.

### ✅ Soluções

1. **Verificar versão da Evolution API:**
   - Diferentes versões têm endpoints diferentes
   - Consulte documentação da sua versão

2. **Testar endpoints manualmente:**
   ```bash
   # Teste cada endpoint
   curl https://sua-api.com/instance/connect/teste
   curl https://sua-api.com/instance/qrcode/teste
   curl https://sua-api.com/instance/qr/teste
   ```

3. **Verificar se instância existe:**
   ```bash
   curl https://sua-api.com/instance/fetchInstances
   ```

---

## ❌ Erro: "Erro HTTP 401" ou "Unauthorized"

### O que significa?

API Key inválida ou ausente.

### ✅ Soluções

1. **Verificar API Key:**
   - Está correta?
   - Não tem espaços extras?
   - Está no formato correto?

2. **Verificar header:**
   - Evolution API espera header `apikey`
   - Verifique se está configurado corretamente

3. **Gerar nova API Key:**
   - Se não funcionar, gere uma nova
   - Atualize no EvoConnect

---

## ❌ Erro: "QR Code não aparece"

### Possíveis causas:

1. **API não responde**
2. **Endpoints não existem**
3. **Instância já conectada**
4. **Erro na geração do QR**

### ✅ Soluções Passo a Passo

#### 1. Verificar Console (F12)

Abra o Console do navegador e veja:
- ❌ Erros de rede?
- ❌ Erros de CORS?
- ❌ Erros de autenticação?

#### 2. Testar API Manualmente

```bash
# Teste se API responde
curl -H "apikey: sua-key" \
     https://sua-api.com/instance/connect/teste
```

#### 3. Verificar Instância

A instância pode já estar conectada:
```bash
curl -H "apikey: sua-key" \
     https://sua-api.com/instance/status/nome-instancia
```

#### 4. Verificar Logs da API

Veja os logs da Evolution API para entender o erro.

---

## ❌ Erro: "Tempo Esgotado"

### O que significa?

QR Code expirou (após 5 minutos).

### ✅ Solução

1. Clique em **"Cancelar"**
2. Clique novamente em **"Conectar WhatsApp"**
3. Um novo QR Code será gerado
4. Escaneie rapidamente

### 💡 Dica

- Tenha o WhatsApp aberto antes de gerar o QR
- Escaneie imediatamente após aparecer
- Use internet estável

---

## ❌ Erro: "Conexão não detectada"

### Possíveis causas:

1. **QR Code não foi escaneado**
2. **WhatsApp não conectou**
3. **Timeout na verificação**

### ✅ Soluções

1. **Verificar se escaneou:**
   - Confirme no celular que conectou
   - Veja se aparece "WhatsApp Web conectado"

2. **Aguardar mais tempo:**
   - Pode levar até 30 segundos
   - Não feche a página

3. **Verificar manualmente:**
   - Clique no botão 🔄 (verificar status)
   - Veja se aparece como conectada

4. **Tentar novamente:**
   - Desconecte e conecte novamente
   - Gere novo QR Code

---

## 🔍 Como Diagnosticar Problemas

### 1. Abrir Console do Navegador

**Chrome/Edge:**
- Pressione `F12`
- Ou: `Ctrl + Shift + I`
- Aba "Console"

**Firefox:**
- Pressione `F12`
- Ou: `Ctrl + Shift + K`

**Safari:**
- `Cmd + Option + I`
- Ative "Desenvolvedor" nas preferências

### 2. Verificar Aba Network

1. Abra DevTools (F12)
2. Aba "Network"
3. Tente conectar
4. Veja as requisições:
   - ❌ Vermelho = Erro
   - ✅ Verde = Sucesso
   - Clique na requisição para ver detalhes

### 3. Verificar Resposta da API

Na aba Network:
1. Clique na requisição que falhou
2. Aba "Response"
3. Veja o que a API retornou:
   - JSON = ✅ Correto
   - HTML = ❌ URL/Endpoint errado
   - Erro 404 = Endpoint não existe
   - Erro 401 = API Key inválida

### 4. Testar API Externamente

**Com curl:**
```bash
curl -H "apikey: sua-key" \
     -H "Content-Type: application/json" \
     https://sua-api.com/instance/fetchInstances
```

**Com Postman:**
1. Crie nova requisição
2. URL: `https://sua-api.com/instance/fetchInstances`
3. Header: `apikey: sua-key`
4. Envie e veja resposta

---

## 📋 Checklist de Diagnóstico

Use este checklist para identificar o problema:

```
□ URL da API está correta?
  └─ Teste no navegador
  └─ Verifica formato (http:// ou https://)
  └─ Sem barra no final

□ API Key está correta?
  └─ Copiou corretamente?
  └─ Sem espaços extras?
  └─ Formato correto?

□ API está online?
  └─ Teste ping
  └─ Teste no navegador
  └─ Verifica logs da API

□ CORS está configurado?
  └─ Veja erro no console
  └─ Configure na Evolution API
  └─ Veja EXAMPLE_CONFIG.md

□ Endpoints existem?
  └─ Teste manualmente
  └─ Verifica versão da API
  └─ Consulta documentação

□ Nome da instância está correto?
  └─ Sem espaços (será sanitizado)
  └─ Sem caracteres especiais
  └─ Formato válido

□ Instância já existe?
  └─ Verifica lista de instâncias
  └─ Pode estar já conectada
  └─ Tenta desconectar primeiro
```

---

## 🆘 Ainda com Problemas?

### 1. Coletar Informações

Antes de pedir ajuda, colete:

- ✅ **URL da API** (sem API Key!)
- ✅ **Versão da Evolution API**
- ✅ **Erro exato** do console (F12)
- ✅ **Screenshot** do erro
- ✅ **Resposta da API** (aba Network)
- ✅ **Navegador e versão**

### 2. Onde Pedir Ajuda

1. **GitHub Issues**: [Abrir Issue](https://github.com/seu-usuario/evoconnect/issues)
2. **Documentação**: Veja [README.md](README.md)
3. **FAQ**: Veja [FAQ.md](FAQ.md)
4. **Evolution API Docs**: https://doc.evolution-api.com

### 3. Informações Úteis para Reportar

```markdown
**Erro:**
[Descreva o erro]

**Console (F12):**
[Cole o erro do console]

**URL da API:**
[URL sem a API Key]

**Versão Evolution API:**
[Versão que está usando]

**Navegador:**
[Chrome 120, Firefox 121, etc]

**Passos para Reproduzir:**
1. Configurei API
2. Tentei conectar instância "teste"
3. Erro apareceu
```

---

## 💡 Dicas de Prevenção

### ✅ Boas Práticas

1. **Teste a API antes:**
   - Use Postman/curl
   - Verifique se endpoints funcionam

2. **Use nomes simples:**
   - Sem espaços
   - Sem caracteres especiais
   - Minúsculas

3. **Configure CORS corretamente:**
   - Antes de usar em produção
   - Teste localmente primeiro

4. **Mantenha API atualizada:**
   - Versões antigas podem ter endpoints diferentes
   - Consulte changelog

5. **Monitore logs:**
   - Veja logs da Evolution API
   - Identifique problemas rapidamente

---

## ❌ Problema: Instância desconecta automaticamente após alguns minutos

### Possíveis causas:

1. **Configuração da Evolution API (`DEL_INSTANCE`)**
   - A Evolution API pode ter a variável `DEL_INSTANCE` configurada
   - Isso remove instâncias da memória após um tempo sem atividade
   - Verifique no arquivo `.env` da Evolution API:
     ```env
     DEL_INSTANCE=false  # Deve estar como false para não desconectar
     ```

2. **Polling muito frequente**
   - O EvoConnect agora verifica status a cada 60 segundos (otimizado)
   - Durante a conexão inicial, verifica a cada 5 segundos
   - Isso não deve causar desconexões, mas foi otimizado

3. **Problemas de rede/servidor**
   - Instabilidade na conexão com a Evolution API
   - Servidor da Evolution API reiniciando
   - Timeout de conexão

4. **WhatsApp desconectando**
   - WhatsApp pode desconectar por inatividade
   - Dispositivo removido manualmente do WhatsApp
   - Número banido ou suspenso

### ✅ Soluções:

#### 1. Verificar configuração da Evolution API

No arquivo `.env` da Evolution API, verifique:

```env
# Deve estar como false para não desconectar automaticamente
DEL_INSTANCE=false

# Se estiver com um número (ex: 300), remove após X segundos sem conexão
# DEL_INSTANCE=300  # ❌ Isso causaria desconexão após 5 minutos
```

#### 2. Verificar logs da Evolution API

Veja os logs para entender o motivo da desconexão:
- Procure por mensagens de "disconnect"
- Verifique se há erros de autenticação
- Veja se há mensagens sobre timeout

#### 3. Verificar status no EvoConnect

- O EvoConnect agora verifica o status automaticamente a cada 60 segundos
- Use o botão 🔄 (Verificar Status) para verificar manualmente
- Veja se o status muda de "Conectada" para "Desconectada"

#### 4. Reconectar a instância

Se desconectar:
1. Clique no botão 🔄 (Verificar Status) para confirmar
2. Se realmente desconectou, clique em "Conectar" novamente
3. Escaneie o novo QR Code

#### 5. Verificar configuração do servidor

Se a Evolution API está em um servidor:
- Verifique se o servidor não está reiniciando automaticamente
- Veja se há políticas de timeout no servidor/proxy
- Verifique se há balanceadores de carga que podem desconectar conexões

### 💡 Melhorias implementadas no EvoConnect:

- ✅ **Endpoints Seguros**: Removido endpoint `/instance/{name}` que podia causar desconexão
- ✅ **Apenas GET em verificações**: Verificações de status usam apenas métodos GET (leitura)
- ✅ **Sistema Keep-Alive**: Mantém conexões ativas automaticamente a cada 2 minutos
- ✅ Polling reduzido de 3s para 5s durante conexão inicial
- ✅ Verificação periódica de status a cada 60s (em vez de a cada atualização de UI)
- ✅ Cache de nomes de instâncias para reduzir requisições
- ✅ Atualização de UI apenas quando status realmente muda
- ✅ Tratamento de erros melhorado para não desconectar por engano
- ✅ Botão "Verificar Status" usa apenas endpoints seguros de leitura

#### 🔄 Como funciona o Keep-Alive:

O EvoConnect agora possui um sistema de **keep-alive** que:
- Executa automaticamente a cada 2 minutos
- Faz requisições leves para manter a conexão ativa
- Usa endpoints de status que não causam desconexão
- Mantém todas as instâncias conectadas ativas
- Funciona em segundo plano, sem interferir no uso

**Isso ajuda a evitar desconexões automáticas causadas por:**
- Timeout de inatividade da Evolution API
- Políticas de timeout do servidor
- Falta de atividade na conexão

### 🔍 Como diagnosticar:

1. **Abra o Console do navegador (F12)**
2. **Veja as requisições de rede:**
   - Verifique se há erros 401, 404, ou 500
   - Veja se as requisições estão sendo feitas corretamente
3. **Verifique os logs da Evolution API:**
   - Veja se há mensagens sobre desconexão
   - Verifique se há erros de autenticação

### 📝 Nota importante:

A desconexão automática pode ser causada pela Evolution API, não pelo EvoConnect. O EvoConnect apenas verifica o status e exibe informações. Se a instância está desconectando, o problema geralmente está na configuração da Evolution API ou no WhatsApp.

---

## 🔗 Links Úteis

- 📖 [README Completo](README.md)
- ❓ [FAQ](FAQ.md)
- 🚀 [Guia de Deploy](DEPLOY.md)
- ⚙️ [Exemplos de Configuração](EXAMPLE_CONFIG.md)
- 🧪 [Teste Local](TESTE_LOCAL.md)
- ⚡ [Início Rápido](QUICK_START.md)

---

<div align="center">
  <p><strong>Problema resolvido? ⭐ Dê uma estrela no GitHub!</strong></p>
  <p>Ainda com dúvidas? <a href="https://github.com/seu-usuario/evoconnect/issues">Abra uma Issue</a></p>
</div>

