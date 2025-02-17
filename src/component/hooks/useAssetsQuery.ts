import { useQuery } from "@tanstack/react-query";
import { fetchAssets } from "../../api/querys";

export function useAssetsQuery() {
  return useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssets,
  });
}
