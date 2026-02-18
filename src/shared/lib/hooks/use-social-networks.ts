import { useQuery } from "@tanstack/react-query";

import { fetchSocialNetworks } from "../../api";
import { createDefaultQueryOptions } from "../../lib";
import type {
  StrapiEntity,
  StrapiResponse,
  StrapiSocialNetworkAttributes,
} from "../../model";

const QUERY_KEYS = {
  all: ["social-networks"] as const,
  lists: () => [...QUERY_KEYS.all, "list"] as const,
  list: () => [...QUERY_KEYS.lists()] as const,
} as const;

export const useSocialNetworks = () => {
  return useQuery<
    StrapiResponse<StrapiSocialNetworkAttributes>,
    Error,
    StrapiEntity<StrapiSocialNetworkAttributes>[]
  >({
    queryKey: QUERY_KEYS.list(),
    queryFn: fetchSocialNetworks,
    ...createDefaultQueryOptions<StrapiSocialNetworkAttributes>(),
  });
};
