import mongoose, { Schema } from 'mongoose';


export interface IChain {
  _id?: string;
  symbol: string;
  name: string;
  hex: string;
  chainId: string;
  rpc: string;
  abiRouter: string;
  addressRouter: string;
  abiFactory: string;
  addressFactory: string;
  user: string;
}

const schema = new mongoose.Schema(
  {
    symbol: { type: String },
    name: { type: String },
    hex: { type: String },
    chainId: { type: String, required: true },
    rpc: { type: String },
    abiRouter: { type: String },
    addressRouter: { type: String },
    abiFactory: { type: String },
    addressFactory: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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

export const Chain = mongoose.model<IChain>('Chain', schema); 