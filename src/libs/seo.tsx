import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { type Metadata } from "next";

import { getBaseUrl } from "~/libs/utils";

interface Prams {
  title?: string,
  description?: string,
  url?: string,
  images?: OpenGraph['images']
}

export const seo = (params: Prams): Metadata => {
  const title = params.title ? `${params.title} | oph2025` : 'oph2025';
  const description = params.description || 'oph2025';
  const images = params.images ?? ['/api/og']
  const url = params.url ? `${getBaseUrl()}${params.url}` : getBaseUrl();

  return { 
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    applicationName: 'oph2025',
    alternates: { canonical: url },
    openGraph: { url, images, type: 'website'},
    icons: { icon: '/favicon.ico' }
  }
}
