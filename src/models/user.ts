import AuthService from '@src/middleware/AuthService';
import mongoose, { model } from 'mongoose';

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
}

export enum CUSTOM_VALIDATION {
    DUPLICATED = 'DUPLICATED',
}

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
        },
        username: { type: String, required: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        toJSON: {
            transform: (_, ret): void => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);
/**
 * Validates the email and throws a validation error, otherwise it will throw a 500
 */
schema.path('email').validate(
    async (email: string) => {
        const emailCount = await mongoose.models.User.countDocuments({ email });
        return !emailCount;
    },
    'already exists in the database.',
    CUSTOM_VALIDATION.DUPLICATED
);
schema.path('username').validate(
    async (username: string) => {
        const usernameCount = await mongoose.models.User.countDocuments({ username });
        return !usernameCount;
    },
    'already exists in the database.',
    CUSTOM_VALIDATION.DUPLICATED
);

schema.pre('save', async function (): Promise<void> {
    if (!this.password || !this.isModified('password')) {
        return;
    }
    try {
        const hashedPassword = await AuthService.hashPassword(this.password);
        this.password = hashedPassword;
    } catch (err) {
        console.error(`Error hashing the password for the user ${this.name}`, err);
    }
});

const User = mongoose.models.User || model<IUser>('User', schema);

export default User;