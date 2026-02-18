import axios from "axios";

import { getApiHeaders, getApiUrl } from "../config/api";
import type {
  StrapiEmployeeAttributes,
  StrapiResponse,
} from "../model/strapi";

export const fetchEmployees = async () => {
  const url = getApiUrl("employees");
  const response = await axios.get<StrapiResponse<StrapiEmployeeAttributes>>(
    url,
    {
      headers: getApiHeaders(),
      params: {
        populate: ["img"],
        sort: "createdAt:asc",
      },
    },
  );

  return response.data;
};
