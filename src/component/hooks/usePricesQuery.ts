import { useQuery } from "@tanstack/react-query";
import { fetchPrices, FetchPricesParams } from "../../api/querys";

export function usePricesQuery(params: FetchPricesParams) {
  return useQuery({
    queryKey: ["prices", params],
    queryFn: () => fetchPrices(params),
  });
}
