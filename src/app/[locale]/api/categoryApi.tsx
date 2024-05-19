const BASE_URL ='https://test-api-teleshtorm.teleshtorm.org';

export interface CategoryResponse {
    id: string
    name: string
    translit_name: string
    channels_count: number
  }
const request = async (url: string): Promise<CategoryResponse[]> => {
    const res = await fetch(`${BASE_URL}/${url}`);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};
export async function getCategory() {
    return request('channels/categories')
}