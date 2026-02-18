import axios from "axios";

import { getApiHeaders, getApiUrl } from "../config/api";
import type {
  StrapiResponse,
  StrapiSingleResponse,
  StrapiVideoBlogAttributes,
} from "../model/strapi";

export const fetchVideoBlogs = async () => {
  const url = getApiUrl("video-blogs");
  const response = await axios.get<StrapiResponse<StrapiVideoBlogAttributes>>(
    url,
    {
      headers: getApiHeaders(),
      params: {
        populate: ["img"],
        sort: "createdAt:desc",
      },
    },
  );

  return response.data;
};

export const fetchVideoBlogById = async (id: string) => {
  const url = getApiUrl(`video-blogs/${id}`);
  const response = await axios.get<
    StrapiSingleResponse<StrapiVideoBlogAttributes>
  >(url, {
    headers: getApiHeaders(),
    params: {
      populate: ["img"],
    },
  });

  return response.data;
};
