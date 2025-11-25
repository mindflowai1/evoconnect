# 🚀 Configuração Rápida - GitHub Pages

Guia rápido para configurar o EvoConnect no GitHub Pages.

## ✅ Status Atual

- ✅ Repositório criado: https://github.com/mindflowai1/evoconnect
- ✅ Código enviado para o GitHub
- ⏳ **Próximo passo**: Configurar GitHub Pages

## 📝 Passo a Passo

### 1. Acesse o Repositório

Vá para: https://github.com/mindflowai1/evoconnect

### 2. Configure o GitHub Pages

1. Clique em **Settings** (Configurações) no menu superior do repositório
2. No menu lateral esquerdo, clique em **Pages**
3. Em **Source** (Fonte):
   - **Branch**: Selecione `main`
   - **Folder**: Selecione `/ (root)`
4. Clique em **Save** (Salvar)

### 3. Aguarde o Deploy

- O GitHub Pages levará **1-2 minutos** para fazer o deploy
- Você verá uma mensagem verde com a URL do site
- URL será: **https://mindflowai1.github.io/evoconnect/**

### 4. Acesse o Site

Após o deploy, acesse:
```
https://mindflowai1.github.io/evoconnect/
```

## ⚙️ Configuração da Evolution API

### Importante: Configurar CORS

A Evolution API precisa permitir requisições do GitHub Pages. Configure no arquivo `.env` da Evolution API:

```env
# Permitir requisições do GitHub Pages
CORS_ORIGIN=https://mindflowai1.github.io,http://localhost:8000
CORS_METHODS=GET,POST,PUT,DELETE
CORS_CREDENTIALS=true
```

Ou para permitir todas as origens (menos seguro, mas mais fácil):

```env
CORS_ORIGIN=*
```

## 🔄 Atualizar o Site

Sempre que fizer alterações:

```bash
cd "C:\Gaveta 2\Projetos\evoconnect"
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

O GitHub Pages atualizará automaticamente em 1-2 minutos.

## ✅ Checklist

- [ ] GitHub Pages configurado (Settings > Pages)
- [ ] Branch `main` selecionada
- [ ] Folder `/ (root)` selecionado
- [ ] Deploy concluído (mensagem verde aparece)
- [ ] Site acessível em https://mindflowai1.github.io/evoconnect/
- [ ] CORS configurado na Evolution API
- [ ] Teste de conexão funcionando

## 🆘 Problemas Comuns

### Site não aparece

1. Aguarde 2-3 minutos (primeiro deploy pode demorar)
2. Verifique se a branch está correta (`main`)
3. Verifique se o folder está correto (`/ (root)`)
4. Veja os logs em **Settings > Pages > Build and deployment**

### Erro de CORS

1. Configure `CORS_ORIGIN` na Evolution API com a URL do GitHub Pages
2. Reinicie a Evolution API após alterar o `.env`
3. Verifique se o domínio está correto (sem barra no final)

### Página em branco

1. Abra o Console do navegador (F12)
2. Verifique erros de JavaScript
3. Confirme que todos os arquivos foram carregados
4. Verifique se `index.html` está na raiz do repositório

## 📚 Mais Informações

- [Guia Completo de Deploy](DEPLOY.md)
- [README Principal](README.md)
- [Troubleshooting](TROUBLESHOOTING.md)

---

**URL do Site**: https://mindflowai1.github.io/evoconnect/

