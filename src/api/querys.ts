import { PriceData } from "../component/hooks/useHistoricalPortfolioQuery";
import { Asset, Portfolio } from "../types/types";

export async function fetchAssets(): Promise<Asset[]> {
  try {
    const res = await fetch("http://localhost:3000/assets");
    if (!res.ok) {
      throw new Error("Failed to fetch assets");
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}

export interface FetchPricesParams {
  assets: string[];
  asOf?: string;
  from?: string;
  to?: string;
}

export async function fetchPrices(
  params: FetchPricesParams
): Promise<PriceData[]> {
  const { assets, asOf, from, to } = params;
  const query = new URLSearchParams();
  if (assets && assets.length > 0) {
    query.set("assets", assets.join(","));
  }
  if (asOf) {
    query.set("asOf", asOf);
  }
  if (from) {
    query.set("from", from);
  }
  if (to) {
    query.set("to", to);
  }
  const url = `http://localhost:3000/prices?${query.toString()}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch prices for: ${url}`);
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}

export interface FetchPortofoliosParams {
  asOf?: string;
}

export async function fetchPortfolios(
  params?: FetchPortofoliosParams
): Promise<Portfolio> {
  const query = new URLSearchParams();
  if (params?.asOf) {
    query.set("asOf", params.asOf);
  }
  const queryStr = query.toString();
  const url = `http://localhost:3000/portofolios${
    queryStr ? "?" + queryStr : ""
  }`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch Portfolio from: ${url}`, res);
      throw new Error(`Failed to fetch Portfolio: ${url}`);
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}
