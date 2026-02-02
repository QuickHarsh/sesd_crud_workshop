import { z } from 'zod';

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(3, 'Name must be at least 3 characters long'),
        description: z.string().min(10, 'Description must be at least 10 characters long'),
        price: z.number().min(0, 'Price must be greater than or equal to 0'),
        category: z.string().min(3, 'Category is required'),
        stock: z.number().min(0).optional(),
    }),
});

export const updateProductSchema = z.object({
    body: z.object({
        name: z.string().min(3).optional(),
        description: z.string().min(10).optional(),
        price: z.number().min(0).optional(),
        category: z.string().min(3).optional(),
        stock: z.number().min(0).optional(),
    }),
});
