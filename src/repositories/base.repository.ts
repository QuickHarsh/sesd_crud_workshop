import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export class BaseRepository<T extends Document> {
    constructor(protected readonly model: Model<T>) { }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    async findAll(filter: FilterQuery<T> = {}, options: any = {}): Promise<T[]> {
        const { sort, limit, skip } = options;
        let query = this.model.find(filter);

        if (sort) query = query.sort(sort);
        if (skip) query = query.skip(skip);
        if (limit) query = query.limit(limit);

        return query.exec();
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    async count(filter: FilterQuery<T> = {}): Promise<number> {
        return this.model.countDocuments(filter).exec();
    }
}
