import { useQuery } from "@tanstack/react-query";
import { fetchPortfolios, FetchPortofoliosParams } from "../../api/querys";

export function usePortofoliosQuery(params?: FetchPortofoliosParams) {
  return useQuery({
    queryKey: ["portofolios", params],
    queryFn: () => fetchPortfolios(params),
  });
}
