import mongoose, { Schema } from 'mongoose';

export enum ETipoCapital {
    DESPESA = 'DESPESA',
    INVESTIMENTO = 'INVESTIMENTO',
    RECEITA = 'RECEITA',
}

export interface ICategoria {
    _id?: string;
    name: string;
    tipoCapital: ETipoCapital;
    user: string;
}

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        tipoCapital: { type: String, required: true },
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

export const Categoria = mongoose.model<ICategoria>('Categoria', schema); 