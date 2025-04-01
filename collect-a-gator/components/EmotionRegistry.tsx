'use client';

import { CacheProvider } from '@emotion/react';
import { ReactNode, useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';

export default function EmotionRegistry({ children }: { children: ReactNode }) {
  const [cache] = useState(() => {
    const cache = createCache({
      key: 'mui',
      prepend: true,
    });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    const emotions = (cache.sheet as any).tags;
    if (emotions.length === 0) return null;
    
    let emotionStyles = '';
    emotions.forEach((tag: any) => {
      emotionStyles += tag.innerHTML;
      tag.parentNode?.removeChild(tag);
    });
    
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{ __html: emotionStyles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}