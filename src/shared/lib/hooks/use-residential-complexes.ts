import { useQuery } from "@tanstack/react-query";

import {
  fetchResidentialComplexById,
  fetchResidentialComplexes,
} from "../../api";
import { createDefaultQueryOptions } from "../../lib";
import type {
  StrapiEntity,
  StrapiResponse,
  StrapiResidentialComplexAttributes,
  StrapiSingleResponse,
} from "../../model";

const QUERY_KEYS = {
  all: ["residential-complexes"] as const,
  lists: () => [...QUERY_KEYS.all, "list"] as const,
  list: () => [...QUERY_KEYS.lists()] as const,
  details: () => [...QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...QUERY_KEYS.details(), id] as const,
} as const;

export const useResidentialComplexes = () => {
  return useQuery<
    StrapiResponse<StrapiResidentialComplexAttributes>,
    Error,
    StrapiEntity<StrapiResidentialComplexAttributes>[]
  >({
    queryKey: QUERY_KEYS.list(),
    queryFn: fetchResidentialComplexes,
    ...createDefaultQueryOptions<StrapiResidentialComplexAttributes>(),
  });
};

export const useResidentialComplex = (id: string | undefined = "") => {
  return useQuery<StrapiSingleResponse<StrapiResidentialComplexAttributes> | null>(
    {
      queryKey: QUERY_KEYS.detail(id),
      queryFn: () => fetchResidentialComplexById(id),
      enabled: !!id,
    },
  );
};
