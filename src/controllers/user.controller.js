//lab1
exports.create = (req, res) => {
    return res.send({ message: 'create handler' });
};

exports.findAll = (req, res) => {
    return res.send({ message: 'findAll handler' });
};

exports.findOne = (req, res) => {
    return res.send({ message: 'findOne handler' });
};

exports.update = (req, res) => {
    return res.send({ message: 'update handler' });
};

exports.delete = (req, res) => {
    return res.send({ message: 'delete handler' });
};

exports.deleteAll = (req, res) => {
    return res.send({ message: 'deleteAll handler' });
};

exports.findAllFavorite = (req, res) => {
    return res.send({ message: 'findAllFavorite handler' });
};

//lab2 step3
const UserService = require('../services/user.service');
const ApiError = require('../api-error');



//create and savee a new User
exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }
    try {
        const userService = new UserService();
        const user = await userService.create(req.body);
        return res.send(user);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while creating the user')
        );
    }
};

//lab2 step 3 (tt)
//Retrivel all carts of a user fporm the database
//Implement findAll handler
exports.findAll = async (req, res, next) => {
    let carts = [];

    try {
        const userService = new UserService();
        const { id } = req.query;
        if (id) {
            carts = await userService.findByName(id);
        } else {
            carts = await userService.all();
            
        }

    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving carts')
        );
    }
    return res.send(carts);
};


//Implement findOne handler
// Find a single user with an id
exports.findOne = async(req, res, next) => {
    try {
        const userService = new UserService();
        const user = await userService.findById(req.params.id);
        if (!user) {
            return next(new ApiError(404, 'User not found'));
        }
        return res.send(user);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving user with id=${req.params.id}`
            )
        );
    }
};


//Implement update handler
// uPDATE a single user by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }
    try {
        const userService = new UserService();
        const update = await userService.update(req.params.id, req.body);
        if(!update) {
            return next(new ApiError(404, 'User not found'));
        }
        return res.send({ message: 'User was update succesfully' });
    } catch (error) {   
        console.log(error);
        return next(
            new ApiError(500, `Error updating user with id=${req.params.id}`)
        );
    }
};

//Implement delete handler
//Delete a user with the specifies id in the request
exports.delete = async(req, res, next ) => {
    try {
        const userService = new UserService();
        const deleted = await userService.delete(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, 'User not found'));
        }
        return res.send({ message: 'User was deleted successfully'});
    }
    catch (error) {
        console.log(error);
            return next(new ApiError(500, `Could not deleted user with id+${req.params.id} `
        )
            );
    }
};


//Implement findAllFavorite handler
//Find all favorate carts of a user
exports.findAllFavorite = async(req, res, next ) => {
    try {
        const userService = new UserService();
        const carts = await userService.allFavorite();
            return res.send(carts);
    }
    catch (error) {
        console.log(error);
            return next(new ApiError(500, `An error occurred while retrieving favorate carts`)
        );
    }
};


//Implement deleteAll handler
//Delete all carts of a user from the database
exports.deleteAll = async(req, res, next ) => {
    try {
        const userService = new UserService();
        const deleted = await userService.deleteAll();
        
            return res.send({
                message: `${deleted} carts were deleted successfully`,
            });
        } catch (error) {
            console.log(error);
            return next(
                new ApiError(500, 'An error occurred while removing all carts')
            );
        }
    };