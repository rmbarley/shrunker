const Joi = require('joi');

const db = require('./connection');

const urls = db.get('urls');
const schema = Joi.object().keys({
    url: Joi.string().uri({
        scheme: [
            /https?/
        ]
    }).required(),
    name: Joi.string().token().min(1).max(100).required()
})

function find(name) {
    return urls.findOne({
        name
    })
}

async function create(preShrunk) {
    const {
        error
    } = schema.validate(preShrunk);
    if (!error) {
        const url = await urls.findOne({
            name: preShrunk.name
        });
        if (!url) {
            return urls.insert(preShrunk);
        } else {
            return Promise.reject({
                details: [{
                    message: 'Short name is in use.'
                }]
            })
        }
    } else {
        return Promise.reject(error);
    }
}

module.exports = {
    create,
    find
}