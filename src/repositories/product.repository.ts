import { BaseRepository } from './base.repository';
import ProductModel, { IProduct } from '../models/product.model';

export class ProductRepository extends BaseRepository<IProduct> {
    constructor() {
        super(ProductModel);
    }
}
