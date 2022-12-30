import { ICategory } from '@src/interfaces/ICategory';
import mongoose, { Schema } from 'mongoose';

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        toJSON: {
            transform: (_, ret): void => {
                delete ret.__v;
            },
        },
    }
);
const Category = mongoose.model<ICategory>('Category', schema);
export default Category;