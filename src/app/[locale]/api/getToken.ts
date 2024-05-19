'use server'

const BASE_URL='https://test-api-teleshtorm.teleshtorm.org'

const request = async (): Promise<{ csrf_token: string }> => {
    const res = await fetch(`${BASE_URL}/get_csrf_tokens`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

export async function getToken() {
    const token = await request()
    return token.csrf_token;
}
