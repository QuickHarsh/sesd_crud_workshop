import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    public createProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json({ success: true, data: product });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    public getAllProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = (req.query.search as string) || '';
            const sortBy = (req.query.sortBy as string) || 'createdAt';
            const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';

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

    public getProductById = async (req: Request, res: Response): Promise<void> => {
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

    public updateProduct = async (req: Request, res: Response): Promise<void> => {
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

    public deleteProduct = async (req: Request, res: Response): Promise<void> => {
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
