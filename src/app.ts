import express, { Application } from 'express';
import connectDB from './config/database';
import { errorMiddleware } from './middlewares/error.middleware';

class App {
    public app: Application;
    public port: number;

    constructor(controllers: any[], port: number) {
        this.app = express();
        this.port = port;

        this.connectRelationalDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private connectRelationalDatabase(): void {
        connectDB();
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeControllers(controllers: any[]): void {
        this.app.get('/', (req, res) => {
            res.send('API is running...');
        });

        controllers.forEach((controller) => {
            this.app.use('/api', controller.router);
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
