import express, { Application } from 'express';
import connectDB from './config/database';
import { errorMiddleware } from './middlewares/error.middleware';

class App {
    public app: Application;
    public port: number;

    constructor(routes: any[], port: number) {
        this.app = express();
        this.port = port;

        this.connectRelationalDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }

    private connectRelationalDatabase(): void {
        connectDB();
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(routes: any[]): void {
        this.app.get('/', (req, res) => {
            res.send('API is running...');
        });

        routes.forEach((route) => {
            this.app.use('/api', route.router);
        });

        this.app.use(errorMiddleware);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
