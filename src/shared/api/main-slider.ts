import axios from "axios";

import { getApiHeaders, getApiUrl } from "../config/api";
import { StrapiMainSlider, StrapiSingleResponse } from "../model/strapi";

export const fetchMainSlider = async () => {
  const url = getApiUrl("main-slider");
  const response = await axios.get<StrapiSingleResponse<StrapiMainSlider>>(
    url,
    {
      headers: getApiHeaders(),
      params: {
        populate: ["slides", "slides.img"],
      },
    },
  );

  return response.data;
};
