import mongoose, { Schema } from 'mongoose';


export interface IToken {
    _id?: string;
    name: string;
    symbol: string;
    decimals: number;
    rpc: string;
    abi: string;
    address: string;
    user: string;
    chain: string;
}

const schema = new mongoose.Schema(
    {
        name: { type: String },
        symbol: { type: String },
        decimals: { type: Number },
        rpc: { type: String },
        abi: { type: String },
        address: { type: String },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        chain: { type: Schema.Types.ObjectId, ref: 'Chain' },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        toJSON: {
            transform: (_, ret): void => {
                delete ret.__v;
            },
        },
    }
);

// schema.pre('save', async function (): Promise<void> { 
// });

export const Token = mongoose.model<IToken>('Token', schema); 