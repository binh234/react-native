import axios from "axios";
import {RAPID_API_KEY, JSEARCH_HOST} from '@env';

const JSearchHeaders = {
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": JSEARCH_HOST,
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
