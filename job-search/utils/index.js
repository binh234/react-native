import axios from "axios";
import { RAPID_API_KEY, JSEARCH_HOST } from "@env";
import { jobTitles } from "../constants/jobs";

const JSearchHeaders = {
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": JSEARCH_HOST,
  },
};

export function getJSearchOptions(endpoint, query, method = "GET") {
  return {
    ...JSearchHeaders,
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
  };
}

export function getRandomJobTitle() {
  const randomIndex = Math.floor(Math.random() * jobTitles.length);
  return jobTitles[randomIndex];
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

export default function fetcher(options) {
  return axios(options).then((res) => {
    return res.data.data;
  });
}
