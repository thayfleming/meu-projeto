class FormValidator {
    constructor() {
        this.rules = {
            nome: {
                required: true,
                minLength: 2,
                maxLength: 100
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            telefone: {
                required: true,
                pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/
            },
            idade: {
                required: true,
                min: 1,
                max: 120
            }
        };

        this.messages = {
            required: 'Este campo é obrigatório',
            minLength: 'Mínimo de 2 caracteres',
            maxLength: 'Máximo de 100 caracteres',
            pattern: 'Formato inválido',
            min: 'Valor mínimo é 1',
            max: 'Valor máximo é 120'
        };
    }

    validateField(fieldName, value) {
        const rule = this.rules[fieldName];
        const errors = [];

        if (rule.required && (!value || value.trim() === '')) {
            errors.push(this.messages.required);
        }

        if (value && value.trim() !== '') {
            if (rule.minLength && value.length < rule.minLength) {
                errors.push(this.messages.minLength);
            }

            if (rule.maxLength && value.length > rule.maxLength) {
                errors.push(this.messages.maxLength);
            }

            if (rule.pattern && !rule.pattern.test(value)) {
                errors.push(this.messages.pattern);
            }

            if (rule.min !== undefined && parseInt(value) < rule.min) {
                errors.push(this.messages.min);
            }

            if (rule.max !== undefined && parseInt(value) > rule.max) {
                errors.push(this.messages.max);
            }
        }

        return errors;
    }

    validateForm(formData) {
        const errors = {};
        let isValid = true;

        for (const field in this.rules) {
            const value = formData[field];
            const fieldErrors = this.validateField(field, value);
            
            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors;
                isValid = false;
            }
        }

        return { isValid, errors };
    }

    aplicarMascaraTelefone(input) {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
            }
            
            e.target.value = value;
        });
    }

    mostrarErros(errors) {
        this.limparErros();

        for (const field in errors) {
            const input = document.getElementById(field);
            const errorElement = document.getElementById(`${field}-error`);
            
            if (input && errorElement) {
                input.classList.add('error');
                errorElement.textContent = errors[field][0];
                errorElement.classList.add('show');
            }
        }
    }

    limparErros() {
        const errorElements = document.querySelectorAll('.error-message');
        const errorInputs = document.querySelectorAll('.form-input.error');
        
        errorElements.forEach(el => {
            el.classList.remove('show');
        });
        
        errorInputs.forEach(input => {
            input.classList.remove('error');
        });
    }

    setupValidacaoTempoReal() {
        const inputs = document.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                const field = e.target.id;
                const value = e.target.value;
                const errors = this.validateField(field, value);
                
                this.limparErroCampo(field);
                
                if (errors.length > 0) {
                    this.mostrarErroCampo(field, errors[0]);
                }
            });

            input.addEventListener('input', (e) => {
                const field = e.target.id;
                this.limparErroCampo(field);
            });
        });

        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            this.aplicarMascaraTelefone(telefoneInput);
        }
    }

    mostrarErroCampo(field, message) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}-error`);
        
        if (input && errorElement) {
            input.classList.add('error');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    limparErroCampo(field) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}-error`);
        
        if (input && errorElement) {
            input.classList.remove('error');
            errorElement.classList.remove('show');
        }
    }
}

window.FormValidator = FormValidator;