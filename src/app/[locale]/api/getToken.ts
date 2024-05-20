
const BASE_URL= process.env.BASE_URL

export const req = async (): Promise<any> => {
    const res = await fetch(`https://test-api-teleshtorm.teleshtorm.org/get_csrf_tokens`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    
    const data = await res.json()

    
    return data;
};

export async function getToken() {
    const token = await req()
    return token;
}
