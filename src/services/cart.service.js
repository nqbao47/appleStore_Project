const knex = require('../database/knex');

class CartService {
    constructor() {
    this.carts = knex('carts');
}

//lab2 step 3
    #getCart(payload) {
        const product = { ...payload };
        const productProperties = [
            "title", "email", "address", "phone", "favorite"
    ];
    // Remove non-product properties
    Object.keys(product).forEach(function(key) {
        if (productProperties.indexOf(key) == -1) {
            delete product[key];
        }
    });
    return product;
    }
    async create(payload) {
        const product = this.#getCart(payload);
        const [id] = await this.carts.insert(product);
        return { id, ...product };
    }

//Implement findAll handler
async all() {
    return await this.carts.select('*');

}

async findByName(title) {
    return await this.carts
    .where('title', 'like', `%${title}%`)
    .select('*');
}


//Implement findOne handler
async findById(id) {
    return await this.carts.where('id', id).select('*').first();
    }

//Implement update handler
async update(id, payload) {
    const update = this.#getCart(payload);
    return await this.carts.where('id', id).update(update);
    }

//Implement delete handler
async delete(id) {
    return await this.carts.where('id', id).del();
    }

//Implement findAllFavorite handler
async allFavorite() {
    return await this.carts.where('favorite', 1).select('*');
    }

//Implement deleteAll handler
async deleteAll() {
    return await this.carts.del();
    }

}

// Define methods for accessing the database

module.exports = CartService;
