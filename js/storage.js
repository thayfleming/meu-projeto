class StorageManager {
    constructor() {
        this.key = 'sistema-usuarios';
    }

    salvarUsuarios(usuarios) {
        try {
            localStorage.setItem(this.key, JSON.stringify(usuarios));
            return true;
        } catch (error) {
            console.error('Erro ao salvar usuários:', error);
            return false;
        }
    }

    carregarUsuarios() {
        try {
            const usuarios = localStorage.getItem(this.key);
            return usuarios ? JSON.parse(usuarios) : [];
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            return [];
        }
    }

    adicionarUsuario(usuario) {
        const usuarios = this.carregarUsuarios();
        usuario.id = this.gerarId();
        usuario.dataCriacao = new Date().toISOString();
        usuarios.push(usuario);
        return this.salvarUsuarios(usuarios);
    }

    atualizarUsuario(id, dadosAtualizados) {
        const usuarios = this.carregarUsuarios();
        const index = usuarios.findIndex(u => u.id === id);
        
        if (index !== -1) {
            usuarios[index] = { ...usuarios[index], ...dadosAtualizados };
            return this.salvarUsuarios(usuarios);
        }
        
        return false;
    }

    excluirUsuario(id) {
        const usuarios = this.carregarUsuarios();
        const usuariosFiltrados = usuarios.filter(u => u.id !== id);
        return this.salvarUsuarios(usuariosFiltrados);
    }

    buscarUsuario(id) {
        const usuarios = this.carregarUsuarios();
        return usuarios.find(u => u.id === id);
    }

    gerarId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    limparDados() {
        localStorage.removeItem(this.key);
    }
}

window.StorageManager = StorageManager;