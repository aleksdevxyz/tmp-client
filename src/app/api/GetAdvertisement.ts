import { getLocale } from "next-intl/server";

const BASE_URL =process.env.BASE_URL;

interface AdvertisementResponse {
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
    const locale = await getLocale() || "ru";
    return request(`advertisement/mobile?lang=${locale}`)
}

export async function GetAdvertisement() {
    try {
      const locale = await getLocale() || "ru";
      const res = await fetch(`${process.env.BASE_URL}/advertisement?lang=${locale}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    } catch(error) {
      console.log(error);
    }
    return [];
  }