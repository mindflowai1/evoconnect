// EvoConnect - Evolution API WhatsApp Connection Manager
// Author: EvoConnect Team
// Version: 1.0.0
//
// Configurações Padrão (pré-configuradas):
// - API URL: https://n8n-evolution.kof6cn.easypanel.host
// - API Key: Configurada automaticamente
//
// Nota: As configurações são carregadas automaticamente na primeira execução.
// O usuário pode alterar através do painel de configurações se necessário.

class EvoConnect {
    constructor() {
        this.apiUrl = '';
        this.apiKey = '';
        this.currentInstance = null;
        this.connectionCheckInterval = null;
        this.qrCheckInterval = null;
        this.statusCheckInterval = null; // Intervalo para verificar status de instâncias conectadas
        this.keepAliveInterval = null; // Intervalo para manter conexões ativas (keep-alive)
        this.connectedInstances = [];
        this.instanceToDisconnect = null;
        this.instanceNameCache = {}; // Cache para armazenar name por token
        
        this.init();
    }

    init() {
        this.loadSettings();
        this.loadConnectedInstances();
        this.bindEvents();
        this.updateUI();
        this.startPeriodicStatusCheck(); // Iniciar verificação periódica de status
        this.startKeepAlive(); // Iniciar keep-alive para manter conexões ativas
    }

    // ===== Settings Management =====
    loadSettings() {
        // Configurações padrão (pré-configuradas)
        // Nota: A URL base da API - tente sem /manager primeiro, se não funcionar, adicione /manager
        const defaultSettings = {
            apiUrl: 'https://n8n-evolution.kof6cn.easypanel.host',
            apiKey: 'qwSYwLlijZOh+FaBHrK0tfGzxG6W/J4O'
        };

        // Tenta carregar do localStorage primeiro
        const savedSettings = localStorage.getItem('evoconnect_settings');
        
        if (savedSettings) {
            try {
                const { apiUrl, apiKey } = JSON.parse(savedSettings);
                // Se tem configurações salvas, usa elas
                this.apiUrl = apiUrl || defaultSettings.apiUrl;
                this.apiKey = apiKey || defaultSettings.apiKey;
            } catch (e) {
                // Se erro ao parsear, usa padrões
                this.apiUrl = defaultSettings.apiUrl;
                this.apiKey = defaultSettings.apiKey;
            }
        } else {
            // Se não tem configurações salvas, usa as padrões e salva
            this.apiUrl = defaultSettings.apiUrl;
            this.apiKey = defaultSettings.apiKey;
            
            // Salva automaticamente as configurações padrão
            localStorage.setItem('evoconnect_settings', JSON.stringify({
                apiUrl: this.apiUrl,
                apiKey: this.apiKey
            }));
        }

        // Preenche os campos do formulário
        document.getElementById('apiUrl').value = this.apiUrl;
        document.getElementById('apiKey').value = this.apiKey;
    }

    saveSettings() {
        this.apiUrl = document.getElementById('apiUrl').value.trim();
        this.apiKey = document.getElementById('apiKey').value.trim();

        if (!this.apiUrl || !this.apiKey) {
            this.showToast('error', 'Erro', 'Preencha todos os campos de configuração');
            return false;
        }

        // Remove trailing slash from URL
        this.apiUrl = this.apiUrl.replace(/\/$/, '');

        // Validar URL
        if (!this.validateApiUrl(this.apiUrl)) {
            this.showToast('error', 'Erro', 'URL inválida. Use http:// ou https:// (ex: https://sua-api.com)');
            return false;
        }

        localStorage.setItem('evoconnect_settings', JSON.stringify({
            apiUrl: this.apiUrl,
            apiKey: this.apiKey
        }));

        this.showToast('success', 'Sucesso', 'Configurações salvas com sucesso!');
        this.toggleSettings();
        return true;
    }

    // ===== Connected Instances Management =====
    loadConnectedInstances() {
        const instances = localStorage.getItem('evoconnect_instances');
        if (instances) {
            this.connectedInstances = JSON.parse(instances);
            this.updateConnectedInstancesUI();
        }
    }

    saveConnectedInstances() {
        localStorage.setItem('evoconnect_instances', JSON.stringify(this.connectedInstances));
    }

    async addConnectedInstance(instanceCode) {
        // Buscar informações completas da instância
        let instanceName = instanceCode;
        let instanceData = null;
        
        try {
            const instances = await this.makeRequest('/instance/fetchInstances');
            if (instances && Array.isArray(instances)) {
                const foundInstance = instances.find(inst => 
                    inst.token === instanceCode || 
                    inst.token?.toUpperCase() === instanceCode.toUpperCase() ||
                    inst.name === instanceCode
                );
                if (foundInstance) {
                    instanceName = foundInstance.name;
                    instanceData = foundInstance;
                }
            }
        } catch (err) {
            console.log('Não foi possível buscar dados da instância');
        }
        
        // Garantir que instanceName seja sempre string
        instanceName = String(instanceName || instanceCode);
        
        const existingIndex = this.connectedInstances.findIndex(i => 
            String(i.name) === instanceName || String(i.code) === instanceCode
        );
        
        if (existingIndex === -1) {
            this.connectedInstances.push({
                name: instanceName,
                code: instanceCode,
                token: instanceCode,
                connectionStatus: instanceData?.connectionStatus || 'connecting',
                ownerJid: instanceData?.ownerJid || null,
                profileName: instanceData?.profileName || null,
                connectedAt: new Date().toISOString(),
                status: instanceData?.connectionStatus === 'open' ? 'connected' : 'connecting'
            });
        } else {
            this.connectedInstances[existingIndex].name = instanceName;
            this.connectedInstances[existingIndex].status = instanceData?.connectionStatus === 'open' ? 'connected' : 'connecting';
            this.connectedInstances[existingIndex].connectionStatus = instanceData?.connectionStatus || 'connecting';
            this.connectedInstances[existingIndex].connectedAt = new Date().toISOString();
            if (instanceData) {
                this.connectedInstances[existingIndex].ownerJid = instanceData.ownerJid;
                this.connectedInstances[existingIndex].profileName = instanceData.profileName;
            }
        }
        this.saveConnectedInstances();
        this.updateConnectedInstancesUI();
    }

    removeConnectedInstance(instanceCode) {
        // Remove por código ou nome
        this.connectedInstances = this.connectedInstances.filter(i => 
            String(i.name) !== String(instanceCode) && 
            String(i.code) !== String(instanceCode) &&
            String(i.token) !== String(instanceCode)
        );
        this.saveConnectedInstances();
        this.updateConnectedInstancesUI();
    }

    updateInstanceStatus(instanceCode, status) {
        // Buscar por código, token ou nome
        const instance = this.connectedInstances.find(i => 
            String(i.code) === String(instanceCode) || 
            String(i.token) === String(instanceCode) ||
            String(i.name) === String(instanceCode)
        );
        if (instance) {
            instance.status = status;
            instance.connectionStatus = status === 'connected' ? 'open' : 'close';
            this.saveConnectedInstances();
            this.updateConnectedInstancesUI();
        }
    }

    // ===== UI Management =====
    bindEvents() {
        // Logo click
        document.getElementById('logoLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });

        // Settings
        document.getElementById('btnSettings').addEventListener('click', () => this.toggleSettings());
        document.getElementById('btnCloseSettings').addEventListener('click', () => this.toggleSettings());
        document.getElementById('btnSaveSettings').addEventListener('click', () => this.saveSettings());

        // Connection
        document.getElementById('btnConnect').addEventListener('click', () => this.connect());
        document.getElementById('btnCancelConnection').addEventListener('click', () => this.cancelConnection());

        // Modal
        document.getElementById('btnCancelModal').addEventListener('click', () => this.closeModal());
        document.getElementById('btnConfirmModal').addEventListener('click', () => this.confirmDisconnect());

        // Enter key on instance code
        document.getElementById('instanceCode').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.connect();
            }
        });

        // Close modal on overlay click
        document.getElementById('confirmModal').addEventListener('click', (e) => {
            if (e.target.id === 'confirmModal') {
                this.closeModal();
            }
        });
    }

    toggleSettings() {
        const panel = document.getElementById('settingsPanel');
        panel.classList.toggle('active');
    }

    updateUI() {
        // Configurações já estão carregadas automaticamente
        // Não precisa mostrar aviso se já tem configurações padrão
        if (this.apiUrl && this.apiKey) {
            // Configurações já estão prontas, não precisa fazer nada
            return;
        }
        
        // Se por algum motivo não tem configurações, mostra aviso
        if (!this.apiUrl || !this.apiKey) {
            this.showToast('info', 'Configuração Necessária', 'Por favor, configure a URL e chave da API primeiro');
            setTimeout(() => this.toggleSettings(), 500);
        }
    }

    updateConnectedInstancesUI() {
        const connectedCard = document.getElementById('connectedCard');
        const instancesList = document.getElementById('instancesList');

        if (this.connectedInstances.length === 0) {
            connectedCard.style.display = 'none';
            return;
        }

        connectedCard.style.display = 'block';
        instancesList.innerHTML = '';

        this.connectedInstances.forEach(instance => {
            const item = document.createElement('div');
            item.className = 'instance-item';
            
            // Garantir que instance.name seja sempre string
            const instanceName = String(instance.name || instance.code || 'Instância Desconhecida');
            const instanceCode = String(instance.code || instance.token || instanceName);
            
            // Determinar status real
            const connectionStatus = instance.connectionStatus || instance.status;
            let statusClass = 'warning';
            let statusText = 'Verificando...';
            let statusIcon = '🟡';
            
            if (connectionStatus === 'open' || connectionStatus === 'connected') {
                statusClass = 'success';
                statusText = 'Conectada';
                statusIcon = '🟢';
            } else if (connectionStatus === 'close' || connectionStatus === 'disconnected') {
                statusClass = 'error';
                statusText = 'Desconectada';
                statusIcon = '🔴';
            } else if (connectionStatus === 'connecting') {
                statusClass = 'warning';
                statusText = 'Conectando...';
                statusIcon = '🟡';
            }
            
            const date = new Date(instance.connectedAt);
            const dateStr = date.toLocaleString('pt-BR');
            
            // Informações adicionais
            const profileName = instance.profileName ? ` • ${instance.profileName}` : '';
            const ownerInfo = instance.ownerJid ? ` • ${instance.ownerJid.split('@')[0]}` : '';

            // Escapar caracteres especiais para evitar problemas no HTML
            const escapeHtml = (str) => {
                const div = document.createElement('div');
                div.textContent = str;
                return div.innerHTML;
            };
            
            item.innerHTML = `
                <div class="instance-info">
                    <div class="instance-header">
                        <h3>${escapeHtml(instanceName)}</h3>
                        <span class="status-indicator ${statusClass}"></span>
                    </div>
                    <div class="instance-details">
                        <p class="instance-status">${statusIcon} ${statusText}${escapeHtml(profileName)}</p>
                        <p class="instance-date">Conectada em ${dateStr}${escapeHtml(ownerInfo)}</p>
                        <p class="instance-code" style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Código: ${escapeHtml(instanceCode)}</p>
                    </div>
                </div>
                <div class="instance-actions">
                    <button class="btn-action btn-reconnect" onclick="app.reconnect('${escapeHtml(instanceCode)}')" title="Verificar Status">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                            <path d="M21 3v5h-5"/>
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                            <path d="M3 21v-5h5"/>
                        </svg>
                        <span>Verificar</span>
                    </button>
                    <button class="btn-action btn-disconnect" onclick="app.showDisconnectModal('${escapeHtml(instanceCode)}')" title="Desconectar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16 17 21 12 16 7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        <span>Desconectar</span>
                    </button>
                </div>
            `;

            instancesList.appendChild(item);
        });

        // Não verificar status aqui - será feito pelo intervalo periódico
        // Isso evita múltiplas requisições desnecessárias
    }

    // Verificação periódica de status (mais suave, a cada 60 segundos)
    startPeriodicStatusCheck() {
        // Limpar intervalo existente se houver
        if (this.statusCheckInterval) {
            clearInterval(this.statusCheckInterval);
        }

        // Verificar status de todas as instâncias conectadas a cada 60 segundos
        this.statusCheckInterval = setInterval(async () => {
            if (this.connectedInstances.length === 0) return;

            // Verificar status de cada instância conectada
            for (const instance of this.connectedInstances) {
                try {
                    const identifier = instance.code || instance.token || instance.name;
                    if (identifier) {
                        await this.checkInstanceStatus(String(identifier));
                    }
                } catch (error) {
                    // Ignorar erros silenciosamente para não poluir o console
                    console.debug('Status check error for instance:', instance.name || instance.code, error);
                }
            }
        }, 60000); // Verificar a cada 60 segundos (1 minuto)
    }

    // Keep-alive: Mantém conexões ativas para evitar desconexão automática
    startKeepAlive() {
        // Limpar intervalo existente se houver
        if (this.keepAliveInterval) {
            clearInterval(this.keepAliveInterval);
        }

        // Executar keep-alive a cada 2 minutos (120 segundos)
        // Isso mantém a conexão ativa sem sobrecarregar a API
        this.keepAliveInterval = setInterval(async () => {
            if (this.connectedInstances.length === 0) return;

            // Para cada instância conectada, fazer um "ping" para manter ativa
            for (const instance of this.connectedInstances) {
                try {
                    const identifier = instance.code || instance.token || instance.name;
                    if (!identifier) continue;

                    // Obter o name da instância (usar cache se disponível)
                    let instanceName = instance.name;
                    if (!instanceName && this.instanceNameCache[identifier]) {
                        instanceName = this.instanceNameCache[identifier];
                    } else if (!instanceName) {
                        // Buscar o name se não estiver em cache
                        try {
                            const instances = await this.makeRequest('/instance/fetchInstances');
                            if (instances && Array.isArray(instances)) {
                                const found = instances.find(inst => 
                                    inst.token === identifier || 
                                    inst.token?.toUpperCase() === String(identifier).toUpperCase() ||
                                    inst.name === identifier
                                );
                                if (found) {
                                    instanceName = found.name;
                                    this.instanceNameCache[identifier] = instanceName;
                                }
                            }
                        } catch (err) {
                            console.debug('Keep-alive: Could not fetch instance name:', err);
                            continue;
                        }
                    }

                    if (!instanceName) continue;

                    // Fazer uma requisição leve para manter a conexão ativa
                    // Usar endpoint de status que é leve e não causa desconexão
                    const encodedName = encodeURIComponent(instanceName);
                    
                    // Tentar endpoints leves que mantêm a conexão ativa
                    const keepAliveEndpoints = [
                        `/instance/connectionState/${encodedName}`,
                        `/instance/status/${encodedName}`,
                        `/instance/${encodedName}`
                    ];

                    for (const endpoint of keepAliveEndpoints) {
                        try {
                            await this.makeRequest(endpoint);
                            // Se funcionou, parar de tentar outros endpoints
                            console.debug(`Keep-alive: Instância "${instanceName}" mantida ativa`);
                            break;
                        } catch (err) {
                            // Continuar tentando outros endpoints
                            continue;
                        }
                    }
                } catch (error) {
                    // Ignorar erros silenciosamente - não queremos interromper o keep-alive
                    console.debug('Keep-alive error for instance:', instance.name || instance.code, error);
                }
            }
        }, 120000); // Executar a cada 2 minutos (120 segundos)
    }

    // ===== Utility Methods =====
    sanitizeInstanceName(name) {
        // Remove espaços e caracteres especiais, mantém apenas letras, números, hífen e underscore
        return name.trim()
            .replace(/\s+/g, '-')  // Substitui espaços por hífen
            .replace(/[^a-zA-Z0-9\-_]/g, '')  // Remove caracteres especiais
            .toLowerCase();  // Converte para minúsculas
    }

    validateApiUrl(url) {
        if (!url) return false;
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    }

    // ===== API Methods =====
    async makeRequest(endpoint, method = 'GET', body = null) {
        if (!this.apiUrl || !this.apiKey) {
            this.showToast('error', 'Erro', 'Configure a API primeiro');
            return null;
        }

        // Validar URL e remover /manager se existir (a API não precisa disso)
        let cleanUrl = this.apiUrl.replace(/\/manager\/?$/, '').replace(/\/$/, '');
        
        if (!this.validateApiUrl(cleanUrl)) {
            throw new Error('URL da API inválida. Verifique se está no formato correto (http:// ou https://)');
        }

        try {
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.apiKey
                }
            };

            if (body) {
                options.body = JSON.stringify(body);
            }

            const fullUrl = `${cleanUrl}${endpoint}`;
            const response = await fetch(fullUrl, options);
            
            // Verificar se a resposta é HTML (erro comum quando URL está errada)
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('text/html')) {
                const text = await response.text();
                if (text.includes('<!doctype') || text.includes('<html')) {
                    throw new Error(`A API retornou HTML em vez de JSON. Verifique se a URL está correta: ${cleanUrl}`);
                }
            }
            
            if (!response.ok) {
                let errorData = {};
                try {
                    errorData = await response.json();
                } catch {
                    // Se não conseguir parsear JSON, tenta ler como texto
                    const errorText = await response.text();
                    throw new Error(`Erro HTTP ${response.status}: ${errorText.substring(0, 100)}`);
                }
                throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Request Error:', error);
            
            // Melhorar mensagens de erro comuns
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                throw new Error('Não foi possível conectar à API. Verifique:\n• URL está correta\n• API está online\n• CORS está configurado\n• Não há firewall bloqueando');
            }
            
            if (error.message.includes('Unexpected token')) {
                throw new Error('A API retornou dados inválidos. Verifique se a URL da API está correta e se o endpoint existe.');
            }
            
            throw error;
        }
    }

    // ===== Connection Methods =====
    async connect() {
        let instanceCode = document.getElementById('instanceCode').value.trim();

        if (!instanceCode) {
            this.showToast('error', 'Erro', 'Digite o código da instância');
            return;
        }

        // Limpar e normalizar código da instância (remover espaços, manter hífens e letras/números)
        const originalCode = instanceCode;
        instanceCode = instanceCode.replace(/\s+/g, '').toUpperCase(); // Remove espaços e converte para maiúsculas
        
        if (instanceCode !== originalCode) {
            document.getElementById('instanceCode').value = instanceCode;
        }

        // Validar formato do código (deve ter pelo menos alguns caracteres)
        if (instanceCode.length < 3) {
            this.showToast('error', 'Erro', 'Código da instância muito curto. Verifique o código fornecido.');
            return;
        }

        if (!this.apiUrl || !this.apiKey) {
            this.showToast('error', 'Erro', 'Configure a API primeiro');
            this.toggleSettings();
            return;
        }

        // Validar URL antes de tentar conectar
        if (!this.validateApiUrl(this.apiUrl)) {
            this.showToast('error', 'Erro', 'URL da API inválida. Use http:// ou https://');
            this.toggleSettings();
            return;
        }

        this.currentInstance = instanceCode;
        this.showQRCard();
        this.showToast('info', 'Conectando', 'Gerando QR Code...');

        try {
            // Generate QR Code first (já busca o name internamente)
            await this.generateQRCode(instanceCode);
            
            // Then check status (vai buscar o name também)
            await this.checkInstanceStatus(instanceCode);

            // Start checking for connection
            this.startConnectionCheck(instanceCode);

        } catch (error) {
            let errorMessage = error.message || 'Falha ao conectar';
            
            // Mensagens mais amigáveis
            if (errorMessage.includes('HTML em vez de JSON')) {
                errorMessage = 'URL da API parece estar incorreta ou o código da instância não existe. Verifique:\n• URL está completa (com http:// ou https://)\n• Código da instância está correto\n• Endpoint existe na Evolution API';
            }
            
            this.showToast('error', 'Erro de Conexão', errorMessage);
            this.hideQRCard();
        }
    }

    async generateQRCode(instanceCode) {
        try {
            // Primeiro, tentar buscar a instância pelo token para obter o name
            // A Evolution API geralmente usa o 'name' da instância nos endpoints, não o token
            let instanceName = instanceCode;
            let foundInstance = null;
            
            // Sanitizar o código para comparação
            const sanitizedCode = String(instanceCode).trim().toUpperCase();
            
            try {
                // Tentar buscar todas as instâncias para encontrar pelo token
                const instances = await this.makeRequest('/instance/fetchInstances');
                console.log('Instâncias encontradas:', instances?.length || 0);
                
                if (instances && Array.isArray(instances)) {
                    // Procurar pelo token (comparação case-insensitive)
                    foundInstance = instances.find(inst => {
                        const instToken = String(inst.token || '').trim().toUpperCase();
                        const instName = String(inst.name || '').trim();
                        return instToken === sanitizedCode || 
                               instName === String(instanceCode).trim() ||
                               instToken === String(instanceCode).trim().toUpperCase();
                    });
                    
                    if (foundInstance) {
                        instanceName = foundInstance.name; // Usar o name da instância
                        // Armazenar no cache
                        this.instanceNameCache[instanceCode] = instanceName;
                        console.log(`✅ Instância encontrada: "${foundInstance.name}" (token: ${foundInstance.token})`);
                    } else {
                        console.warn(`⚠️ Instância não encontrada com token/código: ${instanceCode}`);
                        console.log('Tokens disponíveis:', instances.map(i => i.token).filter(Boolean));
                        throw new Error(`Instância não encontrada com o código/token fornecido: ${instanceCode}\n\nVerifique se o código está correto e se a instância existe na Evolution API.`);
                    }
                } else {
                    throw new Error('Não foi possível obter a lista de instâncias da API');
                }
            } catch (err) {
                // Se o erro já é sobre instância não encontrada, relançar
                if (err.message.includes('Instância não encontrada')) {
                    throw err;
                }
                console.error('Erro ao buscar lista de instâncias:', err);
                throw new Error(`Não foi possível buscar a instância: ${err.message}\n\nVerifique:\n• URL da API está correta\n• API Key está válida\n• Instância existe na Evolution API`);
            }
            
            // Usar o name da instância (obrigatório - não usar token)
            if (!instanceName || instanceName === instanceCode) {
                throw new Error(`Não foi possível determinar o nome da instância. O código/token "${instanceCode}" não foi encontrado na Evolution API.`);
            }
            
            const encodedName = encodeURIComponent(instanceName);
            console.log(`Tentando gerar QR Code para instância: "${instanceName}" (codificado: ${encodedName})`);
            
            // Try to get QR code - the endpoint varies by Evolution API version
            // Common endpoints: /instance/connect, /instance/qrcode, /instance/qr
            
            let qrData = null;
            let lastError = null;
            const endpoints = [
                `/instance/connect/${encodedName}`,
                `/instance/qrcode/${encodedName}`,
                `/instance/qr/${encodedName}`
            ];

            for (const endpoint of endpoints) {
                try {
                    console.log(`Tentando endpoint: ${endpoint}`);
                    qrData = await this.makeRequest(endpoint);
                    if (qrData && (qrData.qrcode || qrData.base64 || qrData.code || qrData.qrcode?.base64)) {
                        console.log(`✅ QR Code obtido com sucesso do endpoint: ${endpoint}`);
                        break;
                    }
                } catch (err) {
                    lastError = err;
                    console.log(`❌ Tentativa com ${endpoint} falhou:`, err.message);
                }
            }

            if (!qrData) {
                const errorMsg = lastError?.message || 'Não foi possível gerar o QR Code';
                throw new Error(`${errorMsg}\n\nInstância: "${instanceName}"\nToken: ${instanceCode}\n\nVerifique:\n• URL da API está correta\n• API Key está válida\n• Evolution API está rodando\n• Endpoints estão disponíveis\n• Instância existe e está acessível`);
            }

            // Extract QR code from response
            const qrCode = qrData.qrcode?.base64 || qrData.base64 || qrData.code || qrData.qr;
            
            if (!qrCode) {
                // If already connected
                if (qrData.instance?.state === 'open' || qrData.status === 'connected') {
                    this.showToast('success', 'Sucesso', 'Instância já está conectada!');
                    // Salvar com o código original fornecido pelo usuário
                    this.addConnectedInstance(instanceCode);
                    this.hideQRCard();
                    return;
                }
                throw new Error('QR Code não encontrado na resposta da API');
            }

            // Display QR Code
            const qrImg = document.getElementById('qrCode');
            const qrLoader = document.getElementById('qrLoader');
            
            // Check if it's a base64 image or needs to be converted
            const qrSrc = qrCode.startsWith('data:image') ? qrCode : `data:image/png;base64,${qrCode}`;
            
            qrImg.src = qrSrc;
            qrImg.classList.add('visible');
            qrLoader.style.display = 'none';

            this.showToast('success', 'QR Code Gerado', 'Escaneie o código com seu WhatsApp');

        } catch (error) {
            console.error('QR Code Error:', error);
            throw new Error('Erro ao gerar QR Code: ' + error.message);
        }
    }

    startConnectionCheck(instanceCode) {
        // Clear any existing interval
        if (this.connectionCheckInterval) {
            clearInterval(this.connectionCheckInterval);
        }

        // Store the instance name for checking (will be set after first check)
        let instanceName = null;

        // Check every 5 seconds (reduzido para não sobrecarregar a API)
        this.connectionCheckInterval = setInterval(async () => {
            try {
                // First time, get the instance name
                if (!instanceName) {
                    try {
                        const instances = await this.makeRequest('/instance/fetchInstances');
                        if (instances && Array.isArray(instances)) {
                            const foundInstance = instances.find(inst => 
                                inst.token === instanceCode || 
                                inst.token?.toUpperCase() === instanceCode.toUpperCase() ||
                                inst.name === instanceCode
                            );
                            if (foundInstance) {
                                instanceName = foundInstance.name;
                            }
                        }
                    } catch (err) {
                        // If can't fetch, use code directly
                        instanceName = instanceCode;
                    }
                }

                const status = await this.checkInstanceStatus(instanceName || instanceCode);
                
                if (status === 'open' || status === 'connected') {
                    this.onConnectionSuccess(instanceCode);
                }
            } catch (error) {
                console.error('Connection check error:', error);
            }
        }, 5000); // Aumentado de 3s para 5s para reduzir carga na API

        // Stop checking after 5 minutes
        setTimeout(() => {
            if (this.connectionCheckInterval) {
                clearInterval(this.connectionCheckInterval);
                if (this.currentInstance === instanceCode) {
                    this.showToast('warning', 'Tempo Esgotado', 'QR Code expirou. Tente novamente.');
                    this.cancelConnection();
                }
            }
        }, 300000);
    }

    async checkInstanceStatus(instanceIdentifier) {
        try {
            // Se receber um token, buscar o name primeiro (usar cache se disponível)
            let instanceName = instanceIdentifier;
            
            // Se parece um token (tem hífens e é longo), buscar o name
            if (instanceIdentifier.includes('-') && instanceIdentifier.length > 20) {
                // Verificar cache primeiro
                if (this.instanceNameCache[instanceIdentifier]) {
                    instanceName = this.instanceNameCache[instanceIdentifier];
                } else {
                    try {
                        const instances = await this.makeRequest('/instance/fetchInstances');
                        if (instances && Array.isArray(instances)) {
                            const foundInstance = instances.find(inst => 
                                inst.token === instanceIdentifier || 
                                inst.token?.toUpperCase() === instanceIdentifier.toUpperCase()
                            );
                            if (foundInstance) {
                                instanceName = foundInstance.name;
                                // Armazenar no cache
                                this.instanceNameCache[instanceIdentifier] = instanceName;
                            }
                        }
                    } catch (err) {
                        // Se não conseguir buscar, usa o identificador diretamente
                        console.debug('Could not fetch instance name:', err);
                    }
                }
            }
            
            // Usar o name da instância
            const encodedName = encodeURIComponent(instanceName);
            
            const endpoints = [
                `/instance/connectionState/${encodedName}`,
                `/instance/status/${encodedName}`,
                `/instance/${encodedName}`
            ];

            let statusData = null;

            for (const endpoint of endpoints) {
                try {
                    statusData = await this.makeRequest(endpoint);
                    if (statusData) break;
                } catch (err) {
                    // Não logar erros de status check para não poluir o console
                    // Apenas tentar próximo endpoint
                }
            }

            if (!statusData) {
                return 'unknown';
            }

            // Extract status from various possible response formats
            const state = statusData.instance?.state || 
                         statusData.state || 
                         statusData.status || 
                         statusData.connectionStatus ||
                         'unknown';

            // Update instance status in the list (pode ser pelo código, token ou name)
            const instance = this.connectedInstances.find(i => 
                String(i.name) === String(instanceIdentifier) || 
                String(i.code) === String(instanceIdentifier) ||
                String(i.token) === String(instanceIdentifier) ||
                String(i.name) === String(instanceName)
            );
            if (instance) {
                const previousStatus = instance.connectionStatus;
                instance.status = state === 'open' ? 'connected' : 'disconnected';
                instance.connectionStatus = state;
                
                // Só atualizar UI se o status mudou (evita atualizações desnecessárias)
                if (previousStatus !== state) {
                    this.saveConnectedInstances();
                    this.updateConnectedInstancesUI();
                }
            }

            return state;

        } catch (error) {
            console.error('Status check error:', error);
            return 'unknown';
        }
    }

    async onConnectionSuccess(instanceCode) {
        // Clear the checking interval
        if (this.connectionCheckInterval) {
            clearInterval(this.connectionCheckInterval);
        }

        this.showToast('success', 'Conectado! 🎉', 'Instância conectada com sucesso!');
        await this.addConnectedInstance(instanceCode);
        this.hideQRCard();
        this.currentInstance = null;
        document.getElementById('instanceCode').value = '';
    }

    cancelConnection() {
        if (this.connectionCheckInterval) {
            clearInterval(this.connectionCheckInterval);
        }
        this.hideQRCard();
        this.currentInstance = null;
    }

    async reconnect(instanceCode) {
        this.showToast('info', 'Verificando', `Verificando status de ${instanceCode}...`);
        
        try {
            const status = await this.checkInstanceStatus(instanceCode);
            
            if (status === 'open' || status === 'connected') {
                this.showToast('success', 'Conectado', 'Instância está conectada!');
                this.updateInstanceStatus(instanceCode, 'connected');
            } else {
                this.showToast('warning', 'Desconectado', 'A instância está desconectada. Conecte novamente.');
                this.updateInstanceStatus(instanceCode, 'disconnected');
                
                // Offer to reconnect
                document.getElementById('instanceCode').value = instanceCode;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (error) {
            this.showToast('error', 'Erro', 'Não foi possível verificar o status');
        }
    }

    showDisconnectModal(instanceName) {
        this.instanceToDisconnect = instanceName;
        document.getElementById('confirmModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('confirmModal').classList.remove('active');
        this.instanceToDisconnect = null;
    }

    async confirmDisconnect() {
        if (!this.instanceToDisconnect) return;

        // Garantir que seja string
        let instanceCode = String(this.instanceToDisconnect);
        this.closeModal();

        this.showToast('info', 'Desconectando', 'Desconectando instância...');

        try {
            // Buscar o name da instância pelo token/código
            let instanceName = instanceCode;
            
            try {
                const instances = await this.makeRequest('/instance/fetchInstances');
                if (instances && Array.isArray(instances)) {
                    const foundInstance = instances.find(inst => 
                        inst.token === instanceCode || 
                        inst.token?.toUpperCase() === instanceCode.toUpperCase() ||
                        inst.name === instanceCode
                    );
                    if (foundInstance) {
                        instanceName = foundInstance.name;
                    }
                }
            } catch (err) {
                // Se não conseguir buscar, usa o código diretamente
            }
            
            // Usar o name da instância
            const encodedName = encodeURIComponent(instanceName);
            
            const endpoints = [
                `/instance/logout/${encodedName}`,
                `/instance/disconnect/${encodedName}`,
                `/instance/delete/${encodedName}`
            ];

            let success = false;

            for (const endpoint of endpoints) {
                try {
                    await this.makeRequest(endpoint, 'DELETE');
                    success = true;
                    break;
                } catch (err) {
                    // Tentar próximo endpoint
                }
            }

            if (success) {
                this.showToast('success', 'Desconectado', 'Instância desconectada com sucesso');
            } else {
                this.showToast('warning', 'Removido', 'Instância removida da lista');
            }

            this.removeConnectedInstance(instanceName);

        } catch (error) {
            this.showToast('error', 'Erro', 'Erro ao desconectar: ' + error.message);
        }
    }

    showQRCard() {
        document.getElementById('qrCard').style.display = 'block';
        document.getElementById('qrLoader').style.display = 'flex';
        document.getElementById('qrCode').classList.remove('visible');
        document.getElementById('qrCode').src = '';
    }

    hideQRCard() {
        document.getElementById('qrCard').style.display = 'none';
    }

    // ===== Scroll to Top =====
    scrollToTop() {
        // Fechar painel de configurações se estiver aberto
        const settingsPanel = document.getElementById('settingsPanel');
        if (settingsPanel.classList.contains('active')) {
            this.toggleSettings();
        }
        
        // Fechar QR card se estiver aberto
        const qrCard = document.getElementById('qrCard');
        if (qrCard.style.display !== 'none') {
            this.cancelConnection();
        }
        
        // Scroll suave para o topo
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Limpar campo de código se necessário
        const instanceCodeInput = document.getElementById('instanceCode');
        if (instanceCodeInput && instanceCodeInput.value) {
            instanceCodeInput.value = '';
        }
    }

    // ===== Toast Notifications =====
    showToast(type, title, message) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;

        container.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
}

// Initialize the app
const app = new EvoConnect();

