'use server'

const BASE_URL = 'https://test-api-teleshtorm.teleshtorm.org';

const request = async (
  link: FormDataEntryValue | null,
  type: FormDataEntryValue | null,
  category?: FormDataEntryValue | null
) => {
  const res = await fetch(`${BASE_URL}/request_to_add?type=${type}&link=${link}&category=${category}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "csrf_token": 'd64096b7764ded7967d831f886c7b67941715bce',
      "accept": "application/json",
    },
    body: JSON.stringify({ link, category, type }),
  });
  return res.json();
};

export async function postChannel(prevState: any, formData: FormData) {

  const link = formData.get("link");
  const type = prevState
  const category = formData.get("category");
  
  return await request(link, type, category);
}
