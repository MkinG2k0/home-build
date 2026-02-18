import axios from "axios";

import { getApiHeaders, getApiUrl } from "../config/api";
import type {
  StrapiResponse,
  StrapiSocialNetworkAttributes,
} from "../model/strapi";

export const fetchSocialNetworks = async () => {
  const url = getApiUrl("social-networks");
  const response = await axios.get<StrapiResponse<StrapiSocialNetworkAttributes>>(
    url,
    {
      headers: getApiHeaders(),
      params: {
        sort: "createdAt:asc",
      },
    },
  );

  return response.data;
};
