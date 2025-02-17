import { useQuery } from "@tanstack/react-query";

export interface PriceData {
  id: string;
  asset: string;
  price: number;
  timestamp: string;
}

export interface HistoricalPricesParams {
  assets: string[];
  from: string;
  to: string;
}

export function useHistoricalPricesQuery({
  assets,
  from,
  to,
}: HistoricalPricesParams) {
  const assetsParam = assets.join(",");
  return useQuery<PriceData[]>({
    queryKey: ["historicalPrices", assets, from, to],
    queryFn: async () => {
      const query = new URLSearchParams({ assets: assetsParam, from, to });
      const url = `http://localhost:3000/prices?${query.toString()}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch historical prices");
      }
      return res.json();
    },
  });
}
