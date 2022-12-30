import { ICategory } from "@interfaces/ICategory";
import Category from '@models/category'

export default class CategoryService {

    public static async create(props: ICategory): Promise<ICategory> {
        const cat = new Category(props);
        return await cat.save();
    }

    public static async FindAndUpdate(props: ICategory): Promise<ICategory> {
        Category.findByIdAndUpdate(props._id, Category);
        return await Category.findById({ _id: props._id }) as ICategory;
    }

    public static async findAll(userId: string): Promise<ICategory[]> {
        const Categorys = Category.find({ user: userId });
        return Categorys;
    }

    public static async findByName(name: string, userId: string): Promise<ICategory[]> {
        const Categorys = Category.find({ name: { $regex: name }, user: userId });
        return Categorys;
    }

    public static async findByTipoCapital(tipoCapital: string, userId: string): Promise<ICategory[]> {
        const Categorys = Category.find({ tipoCapital: { $regex: tipoCapital }, user: userId });
        return Categorys;
    }

    public static async findById(id: string, userId: string): Promise<ICategory> {
        return await Category.findOne({ _id: id, user: userId }) as ICategory;
    }

}