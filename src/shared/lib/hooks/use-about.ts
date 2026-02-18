import { useQuery } from "@tanstack/react-query";

import { fetchAbout } from "../../api";
import type {
  StrapiAboutAttributes,
  StrapiSingleResponse,
} from "../../model";

const QUERY_KEYS = {
  all: ["about"] as const,
  detail: () => [...QUERY_KEYS.all, "detail"] as const,
} as const;

export const useAbout = () => {
  return useQuery<StrapiSingleResponse<StrapiAboutAttributes> | null>({
    queryKey: QUERY_KEYS.detail(),
    queryFn: fetchAbout,
  });
};
