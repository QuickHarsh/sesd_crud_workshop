import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validate } from '../middlewares/validation.middleware';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema';

export class ProductRoute {
    public path = '/products';
    public router = Router();
    public productController = new ProductController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, validate(createProductSchema), this.productController.createProduct);
        this.router.get(`${this.path}`, this.productController.getAllProducts);
        this.router.get(`${this.path}/:id`, this.productController.getProductById);
        this.router.put(`${this.path}/:id`, validate(updateProductSchema), this.productController.updateProduct);
        this.router.delete(`${this.path}/:id`, this.productController.deleteProduct);
    }
}
