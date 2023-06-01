import { BaseResultModel } from "./models/baseResult";

const API_URL = "http://192.168.1.123:4000";

export async function GetAllByFilter(category: string | null, name: string | null, page: number = 1, limit: number = 1): Promise<BaseResultModel> {
    console.log("Obtendo tudo");
    const filter: any = {
        _page: page,
        _limit: limit
    }

    if(category) {
        filter.category = category;
    }

    if(name) {
        filter.name_like = name;
    }

    const query = new URLSearchParams(filter).toString();
    const response = await fetch(`${API_URL}/products?${query}`);
    const totalCount = response.headers.get('X-Total-Count');
    const result = await response.json();
    return { success: true, data: { products: result, totalCount: totalCount }, errors: null };
}

export async function GetById(id: number): Promise<BaseResultModel> {
    console.log("Obtendo pelo id");
    const response = await fetch(`${API_URL}/products/${id}`);
    const result = await response.json();
    return { success: true, data: result, errors: null };
}