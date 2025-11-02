class Router {
    constructor() {
        this.routes = {
            '/': 'home',
            '/usuarios': 'usuarios',
            '/cadastro': 'cadastro'
        };
        
        this.init();
    }

    init() {
        this.navigate(this.getCurrentRoute());

        window.addEventListener('hashchange', () => {
            this.navigate(this.getCurrentRoute());
        });

        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                this.goTo(route);
            }
        });
    }

    getCurrentRoute() {
        return window.location.hash.slice(1) || '/';
    }

    navigate(path) {
        const routeName = this.routes[path] || 'home';
        
        this.updateActiveLink(routeName);
        this.loadPage(routeName);
    }

    goTo(routeName) {
        const path = this.getPathByRouteName(routeName);
        window.location.hash = path;
    }

    getPathByRouteName(routeName) {
        for (const path in this.routes) {
            if (this.routes[path] === routeName) {
                return path;
            }
        }
        return '/';
    }

    updateActiveLink(activeRoute) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-route') === activeRoute) {
                link.classList.add('active');
            }
        });
    }

    async loadPage(pageName) {
        const app = document.getElementById('app');
        
        try {
            app.innerHTML = '<div class="page loading"><p>Carregando...</p></div>';
            
            let content = '';
            
            switch (pageName) {
                case 'home':
                    content = Templates.home();
                    break;
                case 'usuarios':
                    const usuarios = window.Storage.carregarUsuarios();
                    content = Templates.usuarios(usuarios);
                    break;
                case 'cadastro':
                    content = Templates.cadastro();
                    break;
                default:
                    content = Templates.home();
            }
            
            app.innerHTML = content;
            this.setupPageEvents(pageName);
            
        } catch (error) {
            console.error('Erro ao carregar página:', error);
            app.innerHTML = '<div class="page"><p>Erro ao carregar a página.</p></div>';
        }
    }

    setupPageEvents(pageName) {
        switch (pageName) {
            case 'cadastro':
                this.setupFormEvents();
                break;
            case 'home':
                this.updateHomeStats();
                break;
        }
    }

    setupFormEvents() {
        const form = document.getElementById('user-form');
        if (form) {
            const validator = new FormValidator();
            validator.setupValidacaoTempoReal();

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                App.salvarUsuario();
            });
        }
    }

    updateHomeStats() {
        const usuarios = window.Storage.carregarUsuarios();
        const countElement = document.getElementById('user-count');
        if (countElement) {
            countElement.textContent = usuarios.length;
        }
    }
}

window.Router = Router;