import { IToken, Token } from "@src/models/config/token";

export default class TokensService {

    public static async create(props: IToken): Promise<IToken> {
        const cat = new Token(props);
        return await cat.save();
    }

    public static async findAndUpdate(props: IToken): Promise<IToken> {
        Token.findByIdAndUpdate(props._id, props);
        return await Token.findById({ _id: props._id }) as IToken;
    }

    public static async findAll(userId: string): Promise<IToken[]> {
        const Tokens = Token.find({ user: userId });
        return Tokens;
    }

    public static async findById(id: string, userId: string): Promise<IToken> {
        return await Token.findOne({ _id: id, user: userId }) as IToken;
    }

}