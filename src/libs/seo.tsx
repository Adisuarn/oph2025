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
  const title = params.title ? `${params.title} | Triam Udom Open House 2025` : 'Triam Udom Open House 2025';
  const description = params.description || 'Triam Udom Open House 2025 -- งานเปิดบ้านวิชาการ โรงเรียนเตรียมอุดมศึกษา ประจำปี 2568';
  const url = params.url ? `${getBaseUrl()}${params.url}` : getBaseUrl();

  return { 
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    applicationName: 'oph2025',
    alternates: { canonical: url },
    openGraph: { url, type: 'website'},
    icons: { icon: '/favicon.ico' }
  }
}
