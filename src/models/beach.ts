import mongoose from 'mongoose';

export enum EBeachPosition {
  S = 'S',
  E = 'E',
  W = 'W',
  N = 'N',
}

export interface IBeach {
  _id?: string;
  name: string;
  position: EBeachPosition;
  lat: number;
  lng: number;
}

const schema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        delete ret.__v;
      },
    },
  }
);

export const Beach = mongoose.model<IBeach>('Beach', schema); 