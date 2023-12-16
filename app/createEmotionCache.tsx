"use client";

import createCache from "@emotion/cache";

export default function createEmotionCache() {
  return createCache({ key: "css" });
}

export const cache = createEmotionCache();