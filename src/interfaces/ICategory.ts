export enum EType {
    DESPESA = 'DESPESA',
    INVESTIMENTO = 'INVESTIMENTO',
    RECEITA = 'RECEITA',
}

export interface ICategory {
    _id?: string;
    name: string;
    tipoCapital: EType;
    user: string;
}
