export type Ingredient = {
    id: number;
    name: string;
    quantity?: number | null;
    unit?: string;
};

export type Cake = {
    name: string;
    img: {
        fileName?: string | null;
        file?: File | null;
    };
    ingredients: Ingredient[];
}
