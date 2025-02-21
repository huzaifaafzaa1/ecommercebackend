const Product = require('../models/Product');

// Fetch all products and populate the category field
exports.getProducts = (req, res) => {
    Product.find()
        .populate('category') // Populate the category field
        .then(products => {
            return res.status(200).send(products);
        })
        .catch(error => {
            return res.status(400).send(error);
        });
};

// Fetch a single product by ID and populate the category field
exports.getProductById = (req, res) => {
    Product.findById(req.params.id)
        .populate('category') // Populate the category field
        .then(product => {
            return res.status(200).send(product);
        })
        .catch(error => {
            return res.status(400).send(error);
        });
};

// Create a new product
exports.createProduct = (req, res) => {
    Product.create(req.body)
        .then((product) => {
            return res.status(200).send({
                message: 'Product created successfully',
                product
            });
        })
        .catch(error => {
            return res.status(400).send(error);
        });
};

// Update a product
exports.updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.body.id, req.body)
        .then(() => {
            return Product.findById(req.body.id)
                .populate('category') // Populate the category field after update
                .then(product => {
                    return res.status(200).send(product);
                });
        })
        .catch(error => {
            return res.status(400).send(error);
        });
};

// Delete a product
exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).send('Product deleted Successfully');
        })
        .catch(error => {
            return res.status(400).send(error);
        });
};