import { ProductRepository } from '../repositories/product.repository';
import { IProduct } from '../models/product.model';

export class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    public async createProduct(data: Partial<IProduct>): Promise<IProduct> {
        return this.productRepository.create(data);
    }

    public async getProducts(
        page: number = 1,
        limit: number = 10,
        search: string = '',
        filters: any = {},
        sortBy: string = 'createdAt',
        sortOrder: 'asc' | 'desc' = 'desc'
    ): Promise<{ products: IProduct[]; total: number; page: number; totalPages: number }> {
        const skip = (page - 1) * limit;

        const query: any = { ...filters };
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
            ];
        }

        const sortObject: any = {};
        sortObject[sortBy] = sortOrder === 'asc' ? 1 : -1;

        const products = await this.productRepository.findAll(query, {
            skip,
            limit,
            sort: sortObject,
        });

        const total = await this.productRepository.count(query);
        const totalPages = Math.ceil(total / limit);

        return {
            products,
            total,
            page,
            totalPages,
        };
    }

    public async getProductById(id: string): Promise<IProduct | null> {
        return this.productRepository.findById(id);
    }

    public async updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
        return this.productRepository.update(id, data);
    }

    public async deleteProduct(id: string): Promise<IProduct | null> {
        return this.productRepository.delete(id);
    }
}
