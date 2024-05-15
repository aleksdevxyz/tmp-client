const BASE_URL = process.env.BASE_URL;

const request = async (url: string) => {
    const res = await fetch(`${BASE_URL}/${url}`);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};
export async function getCategory() {
    return request('channels/categories')
}