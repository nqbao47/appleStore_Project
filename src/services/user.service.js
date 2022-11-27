const knex = require('../database/knex');

class UserService {
    constructor() {
    this.users = knex('users');
}

//lab2 step 3
    #getUser(payload) {
        const user = { ...payload };
        const userProperties = [
            "username", "email", "password", "status"
    ];
    // Remove non-user properties
    Object.keys(user).forEach(function(key) {
        if (userProperties.indexOf(key) == -1) {
            delete user[key];
        }
    });
    return user;
    }
    async create(payload) {
        const user = this.#getUser(payload);
        const [id] = await this.users.insert(user);
        return { id, ...user };
    }

//Implement findAll handler
async all() {
    return await this.users.select('*');

}

async findByName(username) {
    return await this.users
    .where('username', 'like', `%${username}%`)
    .select('*');
}


//Implement findOne handler
async findById(id) {
    return await this.users.where('id', id).select('*').first();
    }

//Implement update handler
async update(id, payload) {
    const update = this.#getUser(payload);
    return await this.users.where('id', id).update(update);
    }

//Implement delete handler
async delete(id) {
    return await this.users.where('id', id).del();
    }

//Implement findAllFavorite handler
async allFavorite() {
    return await this.users.where('favorite', 1).select('*');
    }

//Implement deleteAll handler
async deleteAll() {
    return await this.users.del();
    }

}

// Define methods for accessing the database

module.exports = UserService;
