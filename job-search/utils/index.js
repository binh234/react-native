import axios from "axios";

const JSearchHeaders = {
  headers: {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.JSEARCH_HOST,
  },
};

export function getJSearchOptions(endpoint, query) {
  return {
    ...JSearchHeaders,
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
  };
}

export const checkImageURL = (url) => {
  if (!url) return false;
  else {
    const pattern = new RegExp(
      "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$",
      "i"
    );
    return pattern.test(url);
  }
};

export default async function fetcher(options) {
  return axios.get(options).then(res => res.data.data)
}
