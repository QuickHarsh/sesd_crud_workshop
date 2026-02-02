import { Request, Response, Router } from 'express';
import { ProductService } from '../services/product.service';
import { validate } from '../middlewares/validation.middleware';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema';

export class ProductController {
    public router: Router;
    private productService: ProductService;

    constructor() {
        this.router = Router();
        this.productService = new ProductService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/products', validate(createProductSchema), this.createProduct);
        this.router.get('/products', this.getAllProducts);
        this.router.get('/products/:id', this.getProductById);
        this.router.put('/products/:id', validate(updateProductSchema), this.updateProduct);
        this.router.delete('/products/:id', this.deleteProduct);
    }

    private createProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json({ success: true, data: product });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    private getAllProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = (req.query.search as string) || '';
            const sortBy = (req.query.sortBy as string) || 'createdAt';
            const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';

            // Example filter: ?category=Electronics
            const filters: any = {};
            if (req.query.category) filters.category = req.query.category;
            if (req.query.minPrice) filters.price = { ...filters.price, $gte: Number(req.query.minPrice) };
            if (req.query.maxPrice) filters.price = { ...filters.price, $lte: Number(req.query.maxPrice) };

            const result = await this.productService.getProducts(page, limit, search, filters, sortBy, sortOrder);
            res.status(200).json({ success: true, ...result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    private getProductById = async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await this.productService.getProductById(req.params.id);
            if (!product) {
                res.status(404).json({ success: false, message: 'Product not found' });
                return;
            }
            res.status(200).json({ success: true, data: product });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    private updateProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await this.productService.updateProduct(req.params.id, req.body);
            if (!product) {
                res.status(404).json({ success: false, message: 'Product not found' });
                return;
            }
            res.status(200).json({ success: true, data: product });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    private deleteProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await this.productService.deleteProduct(req.params.id);
            if (!product) {
                res.status(404).json({ success: false, message: 'Product not found' });
                return;
            }
            res.status(200).json({ success: true, message: 'Product deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
}
