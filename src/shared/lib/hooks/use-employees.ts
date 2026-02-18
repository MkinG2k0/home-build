import { useQuery } from "@tanstack/react-query";

import { fetchEmployees } from "../../api";
import { createDefaultQueryOptions } from "../../lib";
import type {
  StrapiEntity,
  StrapiEmployeeAttributes,
  StrapiResponse,
} from "../../model";

const QUERY_KEYS = {
  all: ["employees"] as const,
  lists: () => [...QUERY_KEYS.all, "list"] as const,
  list: () => [...QUERY_KEYS.lists()] as const,
} as const;

export const useEmployees = () => {
  return useQuery<
    StrapiResponse<StrapiEmployeeAttributes>,
    Error,
    StrapiEntity<StrapiEmployeeAttributes>[]
  >({
    queryKey: QUERY_KEYS.list(),
    queryFn: fetchEmployees,
    ...createDefaultQueryOptions<StrapiEmployeeAttributes>(),
  });
};
