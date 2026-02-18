import axios from "axios";

import { getApiHeaders, getApiUrl } from "../config/api";
import type {
  StrapiAboutAttributes,
  StrapiSingleResponse,
} from "../model/strapi";

export const fetchAbout = async () => {
  const url = getApiUrl("about");
  const response = await axios.get<StrapiSingleResponse<StrapiAboutAttributes>>(
    url,
    {
      headers: getApiHeaders(),
      params: {
        populate: ["img", "numbers"],
      },
    },
  );

  return response.data;
};
