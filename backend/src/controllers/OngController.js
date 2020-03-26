const crypto = require('crypto');
const connection = require('../database/connection');

/**
 * Query params: params namees and sent after "?" (filters, pagination)
 * Route params: params used to identify resources
 */

module.exports = {

    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
    
        // Criando id da ong
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
    
        return response.json({ id });
    }
}