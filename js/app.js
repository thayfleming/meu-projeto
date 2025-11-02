class App {
    static init() {
        window.Storage = new StorageManager();
        window.RouterInstance = new Router();
        console.log('Aplicação inicializada com sucesso!');
    }

    static salvarUsuario() {
        const validator = new FormValidator();
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            idade: document.getElementById('idade').value
        };

        const validacao = validator.validateForm(formData);
        
        if (!validacao.isValid) {
            validator.mostrarErros(validacao.errors);
            this.mostrarAlerta('Por favor, corrija os erros no formulário.', 'error');
            return;
        }

        const sucesso = Storage.adicionarUsuario(formData);
        
        if (sucesso) {
            this.mostrarAlerta('Usuário cadastrado com sucesso!', 'success');
            setTimeout(() => {
                window.location.hash = '#/usuarios';
            }, 1500);
        } else {
            this.mostrarAlerta('Erro ao cadastrar usuário.', 'error');
        }
    }

    static excluirUsuario(id) {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            const sucesso = Storage.excluirUsuario(id);
            
            if (sucesso) {
                this.mostrarAlerta('Usuário excluído com sucesso!', 'success');
                window.RouterInstance.loadPage('usuarios');
            } else {
                this.mostrarAlerta('Erro ao excluir usuário.', 'error');
            }
        }
    }

    static mostrarAlerta(mensagem, tipo = 'success') {
        const alertContainer = document.getElementById('alert-container');
        
        if (alertContainer) {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${tipo}`;
            alertDiv.textContent = mensagem;
            
            alertContainer.appendChild(alertDiv);
            
            setTimeout(() => {
                alertDiv.remove();
            }, 5000);
        }
    }

    static formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});