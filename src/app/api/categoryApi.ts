const BASE_URL = process.env.BASE_URL;
import { CategoryResponse } from "@/types/types";


const request = async (url: string): Promise<CategoryResponse[]> => {
  try {
    const res = await fetch(`${BASE_URL}/${url}`);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch(error) {
    console.log(error);
  }

  return [];
};

export async function getCategory() {
    return request('channels/categories')
}