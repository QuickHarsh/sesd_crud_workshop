import { Request, Response, NextFunction } from 'express';

export class HttpException extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export const errorMiddleware = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

    res.status(status).json({
        success: false,
        message,
        status,
    });
};
