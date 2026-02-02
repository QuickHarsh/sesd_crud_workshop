import App from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = parseInt(process.env.PORT || '8080');

import { ProductRoute } from './routes/product.route';

const routes: any[] = [
    new ProductRoute(),
];

const app = new App(routes, port);

app.listen();
