import App from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = parseInt(process.env.PORT || '8080');

import { ProductController } from './controllers/product.controller';

const controllers: any[] = [
    new ProductController(),
];

const app = new App(controllers, port);

app.listen();
