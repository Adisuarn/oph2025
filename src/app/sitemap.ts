import type { MetadataRoute } from 'next'

import { getBaseUrl } from '~/libs/utils'

interface Route {
  url: string
  lastModifier: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap: Route[] = [''].map((route) => ({
    url: `${getBaseUrl()}/${route}`,
    lastModifier: new Date().toISOString(),
  }))

  let fetchedRoutes: Route[] = []
  try {
    fetchedRoutes = (await Promise.all([])).flat()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching dynamic routes: ${error.message}`)
    }
  }
  return [...routesMap, ...fetchedRoutes]
}
