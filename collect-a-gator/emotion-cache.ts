'use client';

import createCache from '@emotion/cache';

export const emotionCache = createCache({
  key: 'mui',
  prepend: true,
});