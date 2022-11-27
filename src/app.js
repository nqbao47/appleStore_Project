//step 4
const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to product book application.' });
});


module.exports = app;

//step 5
const productController = require('./controllers/product.controller');

app.route('/api/products')
	.get(productController.findAll)
	.post(productController.create)
	.delete(productController.deleteAll);

app.route('/api/products/favorite')
	.get(productController.findAllFavorite);

app.route('/api/products/:id')
	.get(productController.findOne)
	.put(productController.update)
	.delete(productController.delete);

module.exports = app;

//step 6
const ApiError = require('./api-error');


app.route('/api/products/:id')
	.get(productController.findOne)
	.put(productController.update)
	.delete(productController.delete);

//TESTT-------------------------------

const cartController = require('./controllers/cart.controller');

app.route('/api/carts')
	.get(cartController.findAll)
	.post(cartController.create)
	.delete(cartController.deleteAll);

app.route('/api/carts/favorite')
	.get(cartController.findAllFavorite);

app.route('/api/carts/:id')
	.get(cartController.findOne)
	.put(cartController.update)
	.delete(cartController.delete);

module.exports = app;


//TESTT--------------------------------------

//TESTT-------------------------------

const userController = require('./controllers/user.controller');

app.route('/api/users')
	.get(userController.findAll)
	.post(userController.create)
	.delete(userController.deleteAll);

app.route('/api/users/favorite')
	.get(userController.findAllFavorite);

app.route('/api/users/:id')
	.get(userController.findOne)
	.put(userController.update)
	.delete(userController.delete);

module.exports = app;


//TESTT--------------------------------------

// Handle 404 response.
app.use((req, res, next) => {
	// Handler for unknown route.
	// Call next() to pass to the error handling middleware.
	return next(new ApiError(404, 'Resource not found'));
});
// Define error-handling middleware last, after other app.use() and routes calls.
app.use((error, req, res, next) => {
	// The centralized error handling middleware.
	// In any route handler, calling next(error)
	// will pass to this error handling middleware.
	return res.status(error.statusCode || 500).json({
		message: error.message || 'Internal Server Error',
	});
});
