const Contact = require('../models/contactSchema');
const ContactPhone = require('../models/contactPhoneSchema');

const { Op } = require('sequelize');

module.exports = {
    create: async (req, res) => {
        const contact = await Contact.create({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
        });

        for(let i in req.body.phone) {
            await ContactPhone.create({
                phoneNumber: req.body.phone[i].number,
                contact_id: contact.getDataValue('id')
            });
        } 

        res.status(200).json({contactCreated: true});
    },
    insertPhone: async (req, res) => {
        const hasContact = await Contact.findOne({
            where: {
                id: req.params.contactID
            }
        });
        
        if(!hasContact) {
            res.status(400).json({phoneInserted: false, error: 'Não é possível cadastrar um telefone à um contato inexistente.'});
            return;
        }

        const hasPhoneOptionEquals = await ContactPhone.findOne({
            where: {
                contact_id: req.params.contactID,
                phoneNumber: req.body.phone.number
            }
        });

        if(hasPhoneOptionEquals) {
            res.status(400).json({error: 'Esse contato já possui esse número de telefone cadastrado.'});
            return;
        }

        await ContactPhone.create({
            phoneNumber: req.body.phone.number,
            contact_id: req.params.contactID
        });

        res.status(200).json({phoneInserted: true, errors: []});
    },
    update: async (req, res) => {
        const hasContact = await Contact.findOne({where: {id: req.params.contactID}});
        
        if(!hasContact) {
            res.status(400).json({contactUpdated: false, error: 'Contato inexistente'});
            return;
        }

        if(req.body.phone) {
            let hasPhone = await ContactPhone.findOne({
                where: {
                    contact_id: req.params.contactID,
                    id: req.body.phone.id
                }
            });
            
            if(hasPhone) {
                hasPhone.phoneNumber = req.body.phone.number;
                await hasPhone.save();
            } else {
                res.status(400).json({contactUpdated: false, error: 'Este telefone não existe.'});
                return;
            }
        }
        
        let contactUpdated = await Contact.findOne({where: {id: req.params.contactID}});

        req.body.firstname ? contactUpdated.firstName = req.body.firstname : null;
        req.body.lastname ? contactUpdated.lastName = req.body.lastname : null;
        req.body.email ? contactUpdated.email = req.body.email : null;
        await contactUpdated.save();

        res.status(200).json({contactUpdated: true});
        
    },
    delete: async (req, res) => {
        const hasContact = await Contact.findOne({
            where: {
                id: req.params.contactID
            }
        });

        if(!hasContact) {
            if(!req.query.phone) {
                res.status(400).json({contactDeleted: false, error: 'Não é possível deletar um contato inexistente.'});
                return;
            }
            
            res.status(400).json({contactPhoneDeleted: false, error: 'Não é possível cadastrar um telefone à um contato inexistente.'});
            return;
        }

        if(!req.query.phone) {
            await Contact.destroy({
                where: {
                    id: req.params.contactID
                }
            });
    
            await ContactPhone.destroy({
                where: {
                    contact_id: req.params.contactID
                }
            });

            res.status(200).json({contactDeleted: true});
            return;
        }

        const howManyPhones = await ContactPhone.findAll({where: {contact_id: req.params.contactID}});

        if(howManyPhones.length === 1) {
            res.status(400).json({contactPhoneDeleted: false, error: "contato não pode possuir menos de um telefone cadastrado"});
            return;
        }

        await ContactPhone.destroy({
            where: {
                contact_id: req.params.contactID,
                id: req.query.phone
            }
        });

        res.status(200).json({contactPhoneDeleted: true});
    },
    find: async (req, res) => {
        var contacts = [];
        
        if(req.query.name && req.query.email) {
            contacts = await Contact.findAll({
                where: {
                    [Op.or]: [
                        {firstName: {[Op.substring]: req.query.name}},
                        {lastName: {[Op.substring]: req.query.name}}
                    ],
                    [Op.and]: [
                        {email: {[Op.substring]: req.query.email}}
                    ]
                }
            });
        }

        if(req.query.name && !req.query.email) {
            contacts = await Contact.findAll({
                where: {
                    [Op.or]: [
                        {firstName: {[Op.substring]: req.query.name}},
                        {lastName: {[Op.substring]: req.query.name}}
                    ]
                }
            });
        }

        if(!req.query.name && req.query.email) {
            contacts = await Contact.findAll({
                where: {
                    email: {
                        [Op.substring]: req.query.email
                    }
                }
            });
        }

        if(!req.query.name && !req.query.email) {
            contacts = await Contact.findAll();
        }
        
        const contactPhones = await ContactPhone.findAll();
        let contactsWithPhones = [];

        for(let i in contacts) {
            let phones = contactPhones.filter(phone => (phone.contact_id === contacts[i].id));
        
            contactsWithPhones.push({
                contact: contacts[i], 
                phone: phones.map(phone => ({id: phone.id, number: phone.phoneNumber}))
            });
        }

        res.status(200).json({contacts: contactsWithPhones});
    }
};
