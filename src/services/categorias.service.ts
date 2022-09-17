import { Categoria, ICategoria } from "../models/categoria";

export default class CategoriasService {

    public static async create(categoria: ICategoria): Promise<ICategoria> {
        const cat = new Categoria(categoria);
        return await cat.save();
    }

    public static async FindAndUpdate(categoria: ICategoria): Promise<ICategoria> {
        Categoria.findByIdAndUpdate(categoria._id, categoria);
        return await Categoria.findById({ _id: categoria._id }) as ICategoria;
    }

    public static async findAll(userId: string): Promise<ICategoria[]> {
        const categorias = Categoria.find({ user: userId });
        return categorias;
    }

    public static async findByName(name: string, userId: string): Promise<ICategoria[]> {
        const categorias = Categoria.find({ name: { $regex: name }, user: userId });
        return categorias;
    }

    public static async findByTipoCapital(tipoCapital: string, userId: string): Promise<ICategoria[]> {
        const categorias = Categoria.find({ tipoCapital: { $regex: tipoCapital }, user: userId });
        return categorias;
    }

    public static async findById(id: string, userId: string): Promise<ICategoria> {
        return await Categoria.findOne({ _id: id, user: userId }) as ICategoria;
    }

}