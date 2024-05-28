const BASE_URL =process.env.BASE_URL;

export interface AdvertisementResponse {
    title: string
    content: string
    image: string
    link: string
  }
const request = async (url: string): Promise<AdvertisementResponse[]> => {
    const res = await fetch(`${BASE_URL}/${url}`);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};
export async function getAdvertisement() {
    return request('advertisement/mobile')
}