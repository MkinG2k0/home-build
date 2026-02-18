import axios from "axios";

import { getApiHeaders, getApiUrl } from "../config/api";
import type {
  StrapiResponse,
  StrapiNewsAttributes,
  StrapiSingleResponse,
} from "../model/strapi";

export const fetchNews = async () => {
  const url = getApiUrl("headlines");
  const response = await axios.get<StrapiResponse<StrapiNewsAttributes>>(url, {
    headers: getApiHeaders(),
    params: {
      populate: ["img"],
      sort: "createdAt:desc",
    },
  });

  return response.data;
};

export const fetchNewsById = async (id: string) => {
  const url = getApiUrl(`headlines/${id}`);
  const response = await axios.get<StrapiSingleResponse<StrapiNewsAttributes>>(
    url,
    {
      headers: getApiHeaders(),
      params: {
        populate: ["img"],
      },
    },
  );

  return response.data;
};
