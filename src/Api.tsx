const API_URL = "http://192.168.1.123:4000";

export async function GetAll(){
    const response = await fetch(`${API_URL}/products`);
    return await parseResponse(response);
}

export async function GetById(id: number){
    const response = await fetch(`${API_URL}/products/${id}`);
    return await parseResponse(response);
}

export async function GetByCategory(category: string){
    const response = await fetch(`${API_URL}/products?category=${category}`);
    return await parseResponse(response);
}

async function parseResponse(response: any){
    if(!response || !response.status)
        return { success: false, errors: [{ code: "500", message: "Erro ao processar requisição." }] };

    switch (response.status) {
        case 200:
        case 400:
        case 401:
            return await response.json();
        case 404:
            return { success: false, errors: [{ code: "500", message: "404 - Não foi possível encontrar o endereço solicitado." }] };
        case 500:
        default:
            return { success: false, errors: [{ code: "500", message: "Erro ao processar requisição." }] };
    }
}