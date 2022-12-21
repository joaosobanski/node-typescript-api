import { Chain, IChain } from "@src/models/config/chain";

export default class ChainsService {

    public static async create(props: IChain): Promise<IChain> {
        const cat = new Chain(props);
        return await cat.save();
    }

    public static async findAndUpdate(props: IChain): Promise<IChain> {
        Chain.findByIdAndUpdate(props._id, props);
        return await Chain.findById({ _id: props._id }) as IChain;
    }

    public static async findAll(userId: string): Promise<IChain[]> {
        const Chains = Chain.find({ user: userId });
        return Chains;
    }

    public static async findById(id: string, userId: string): Promise<IChain> {
        return await Chain.findOne({ _id: id, user: userId }) as IChain;
    }

}