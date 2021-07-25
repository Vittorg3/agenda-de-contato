module.exports = {
    newContact: (req, res, next) => {
        let errors = [];

        req.body.firstname === undefined && errors.push('campo FIRSTNAME inválido.');
        req.body.firstname !== undefined && req.body.firstname.trim() === '' ? (errors.push('campo FIRSTNAME inválido.')) : null;

        req.body.lastname === undefined && errors.push('campo LASTNAME inválido.');
        req.body.lastname !== undefined && req.body.lastname.trim() === '' ? errors.push('campo LASTNAME inválido.') : null;

        req.body.email === undefined && errors.push('campo EMAIL inválido.');
        req.body.email !== undefined && req.body.email.trim() === '' ? errors.push('campo EMAIL inválido.') : null;

        req.body.phone === undefined && errors.push('campo PHONE inválido.');
        
        if(![undefined].includes(req.body.phone)) {
            if(req.body.phone.length > 0) {
                for(let i in req.body.phone) {
                    if(!req.body.phone[i].number) {
                        errors.push('PHONE não possui o NUMBER');
                    }
                }
            }

            if(!req.body.phone.length > 0) {
                errors.push('campo PHONE inválido.');
            }
        }

        if(errors.length > 0) {
            res.status(400).json({contactCreated: false, error: 'Campo inválido. Preencha todos os campos corretamente.', fieldsError: errors});
            return;
        }
        
        next();
    },
    updateContact: (req, res, next) => {
        let errors = [];
        Object.keys(req.body).length === 0 && errors.push('nenhum dado para atualizar');
        
        req.body.firstname !== undefined && req.body.firstname.trim() === '' ? (errors.push('campo FIRSTNAME inválido.')) : null;
        req.body.lastname !== undefined && req.body.lastname.trim() === '' ? errors.push('campo LASTNAME inválido.') : null;
        req.body.email !== undefined && req.body.email.trim() === '' ? errors.push('campo EMAIL inválido.') : null;

        if(errors.length > 0) {
            res.status(400).json({contactCreated: false, error: 'Campo inválido. Preencha todos os campos corretamente.', fieldsError: errors});
            return;
        }
        
        next();
    }
};