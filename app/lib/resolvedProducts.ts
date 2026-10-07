import "server-only";

import { cache } from "react";
import { allFlowers, allItems, type FlowerProduct, type ItemProduct } from "./products";
import { getTvData } from "./tvStock";

export const getResolvedFlowers = cache(async (): Promise<FlowerProduct[]> => {
  const { body } = await getTvData({
    type: "flowers",
    staticFlowers: allFlowers,
    staticItems: allItems,
  });
  return body as FlowerProduct[];
});

export const getResolvedItems = cache(async (): Promise<ItemProduct[]> => {
  const { body } = await getTvData({
    type: "items",
    staticFlowers: allFlowers,
    staticItems: allItems,
  });
  return body as ItemProduct[];
});
