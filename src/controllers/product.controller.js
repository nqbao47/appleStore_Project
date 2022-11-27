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
const ProductService = require('../services/product.service');
const ApiError = require('../api-error');



//create and savee a new Product
exports.create = async (req, res, next) => {
    if(!req.body?.title) {
        return next(new ApiError(400, 'Name can not be empty'));
    }
    try {
        const productService = new ProductService();
        const product = await productService.create(req.body);
        return res.send(product);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while creating the product')
        );
    }
};

//lab2 step 3 (tt)
//Retrivel all products of a user fporm the database
//Implement findAll handler
exports.findAll = async (req, res, next) => {
    let products = [];

    try {
        const productService = new ProductService();
        const { title } = req.query;
        if (title) {
            products = await productService.findByName(title);
        } else {
            products = await productService.all();
            
        }

    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving products')
        );
    }
    return res.send(products);
};


//Implement findOne handler
// Find a single product with an id
exports.findOne = async(req, res, next) => {
    try {
        const productService = new ProductService();
        const product = await productService.findById(req.params.id);
        if (!product) {
            return next(new ApiError(404, 'Product not found'));
        }
        return res.send(product);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving product with id=${req.params.id}`
            )
        );
    }
};


//Implement update handler
// uPDATE a single product by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }
    try {
        const productService = new ProductService();
        const update = await productService.update(req.params.id, req.body);
        if(!update) {
            return next(new ApiError(404, 'Product not found'));
        }
        return res.send({ message: 'Product was update succesfully' });
    } catch (error) {   
        console.log(error);
        return next(
            new ApiError(500, `Error updating product with id=${req.params.id}`)
        );
    }
};

//Implement delete handler
//Delete a product with the specifies id in the request
exports.delete = async(req, res, next ) => {
    try {
        const productService = new ProductService();
        const deleted = await productService.delete(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, 'Product not found'));
        }
        return res.send({ message: 'Product was deleted successfully'});
    }
    catch (error) {
        console.log(error);
            return next(new ApiError(500, `Could not deleted product with id+${req.params.id} `
        )
            );
    }
};


//Implement findAllFavorite handler
//Find all favorate products of a user
exports.findAllFavorite = async(req, res, next ) => {
    try {
        const productService = new ProductService();
        const products = await productService.allFavorite();
            return res.send(products);
    }
    catch (error) {
        console.log(error);
            return next(new ApiError(500, `An error occurred while retrieving favorate products`)
        );
    }
};


//Implement deleteAll handler
//Delete all products of a user from the database
exports.deleteAll = async(req, res, next ) => {
    try {
        const productService = new ProductService();
        const deleted = await productService.deleteAll();
        
            return res.send({
                message: `${deleted} products were deleted successfully`,
            });
        } catch (error) {
            console.log(error);
            return next(
                new ApiError(500, 'An error occurred while removing all products')
            );
        }
    };