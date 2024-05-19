'use server'

import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;


const request = async (
  link: FormDataEntryValue | null,
  token: string ,
  category?: FormDataEntryValue | null,
) => {
  const res = await fetch(`${BASE_URL}/request_to_add?type=Канал&link=${link}&category=${category}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "csrf_token": token,
      "accept": "application/json",
    },
    body: JSON.stringify({ link, category }),
  });
  return res.json();
};

export async function postChannel(prevState: any, formData: FormData) {
  const token = cookies().get('token')?.value
  const link = formData.get("link");
  const category = formData.get("category");

  const res = await request(link, token || '',  category);
  
  const msg = res.detail
  
  return msg;
}
