const Templates = {
    home: () => `
        <div class="page">
            <h1>Bem-vindo ao Sistema de Gerenciamento</h1>
            <p>Esta é uma aplicação Single Page Application (SPA) desenvolvida com JavaScript puro.</p>
            <div class="stats">
                <div class="stat-card">
                    <h3>Usuários Cadastrados</h3>
                    <p id="user-count">0</p>
                </div>
            </div>
        </div>
    `,

    usuarios: (usuarios = []) => `
        <div class="page">
            <div class="page-header">
                <h1>Gerenciar Usuários</h1>
                <a href="#/cadastro" class="btn btn-success">Novo Usuário</a>
            </div>
            <div id="alert-container"></div>
            <div class="users-list">
                ${usuarios.length > 0 ? 
                    usuarios.map(usuario => `
                        <div class="user-card" data-id="${usuario.id}">
                            <div class="user-info">
                                <h3>${usuario.nome}</h3>
                                <p>Email: ${usuario.email}</p>
                                <p>Telefone: ${usuario.telefone}</p>
                                <p>Idade: ${usuario.idade} anos</p>
                            </div>
                            <div class="user-actions">
                                <button class="btn btn-danger" onclick="App.excluirUsuario('${usuario.id}')">
                                    Excluir
                                </button>
                            </div>
                        </div>
                    `).join('') : 
                    '<p>Nenhum usuário cadastrado.</p>'
                }
            </div>
        </div>
    `,

    cadastro: (usuario = null) => `
        <div class="page">
            <h1>${usuario ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}</h1>
            <div id="alert-container"></div>
            <form id="user-form" class="form">
                <input type="hidden" id="user-id" value="${usuario ? usuario.id : ''}">
                
                <div class="form-group">
                    <label for="nome" class="form-label">Nome Completo *</label>
                    <input type="text" id="nome" class="form-input" value="${usuario ? usuario.nome : ''}" 
                           placeholder="Digite seu nome completo">
                    <div class="error-message" id="nome-error">Nome é obrigatório</div>
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Email *</label>
                    <input type="email" id="email" class="form-input" value="${usuario ? usuario.email : ''}" 
                           placeholder="Digite seu email">
                    <div class="error-message" id="email-error">Email inválido</div>
                </div>

                <div class="form-group">
                    <label for="telefone" class="form-label">Telefone *</label>
                    <input type="tel" id="telefone" class="form-input" value="${usuario ? usuario.telefone : ''}" 
                           placeholder="(11) 99999-9999">
                    <div class="error-message" id="telefone-error">Telefone inválido</div>
                </div>

                <div class="form-group">
                    <label for="idade" class="form-label">Idade *</label>
                    <input type="number" id="idade" class="form-input" value="${usuario ? usuario.idade : ''}" 
                           placeholder="Digite sua idade" min="1" max="120">
                    <div class="error-message" id="idade-error">Idade deve ser entre 1 e 120</div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn">
                        ${usuario ? 'Atualizar' : 'Cadastrar'} Usuário
                    </button>
                    <a href="#/usuarios" class="btn btn-danger">Cancelar</a>
                </div>
            </form>
        </div>
    `
};

window.Templates = Templates;