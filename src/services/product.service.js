const knex = require('../database/knex');

class ProductService {
    constructor() {
    this.products = knex('products');
}

//lab2 step 3
    #getProduct(payload) {
        const product = { ...payload };
        const productProperties = [
            "title", "description", "image", "categories", "color", "price"
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
        const product = this.#getProduct(payload);
        const [id] = await this.products.insert(product);
        return { id, ...product };
    }

//Implement findAll handler
async all() {
    return await this.products.select('*');

}

async findByTitle(title) {
    return await this.products
    .where('title', 'like', `%${title}%`)
    .select('*');
}


//Implement findOne handler
async findById(id) {
    return await this.products.where('id', id).select('*').first();
    }

//Implement update handler
async update(id, payload) {
    const update = this.#getProduct(payload);
    return await this.products.where('id', id).update(update);
    }

//Implement delete handler
async delete(id) {
    return await this.products.where('id', id).del();
    }

//Implement findAllFavorite handler
async allFavorite() {
    return await this.products.where('favorite', 1).select('*');
    }

//Implement deleteAll handler
async deleteAll() {
    return await this.products.del();
    }

}

// Define methods for accessing the database

module.exports = ProductService;
