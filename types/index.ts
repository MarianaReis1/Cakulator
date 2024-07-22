export type Ingredient = {
    id: number;
    name: string;
    quantity: number;
    unit?: 'g' | 'ml' | 'l' | 'kg' |'';
};

export type Cake = {
    name: string;
    img: {
        fileName?: string | null;
        file?: File | null;
    };
    ingredients: Ingredient[];
}
