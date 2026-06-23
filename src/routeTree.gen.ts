/* eslint-disable */
// @ts-nocheck

// Static GitHub Pages route tree.
// Server-only sitemap route removed.

import { Route as rootRouteImport } from './routes/__root'
import { Route as TeamRouteImport } from './routes/team'
import { Route as PracticeAreasRouteImport } from './routes/practice-areas'
import { Route as ContactRouteImport } from './routes/contact'
import { Route as AboutRouteImport } from './routes/about'
import { Route as IndexRouteImport } from './routes/index'
import { Route as PracticeAreasIndexRouteImport } from './routes/practice-areas.index'
import { Route as PracticeAreasSlugRouteImport } from './routes/practice-areas.$slug'

const TeamRoute = TeamRouteImport.update({
  id: '/team',
  path: '/team',
  getParentRoute: () => rootRouteImport,
} as any)

const PracticeAreasRoute = PracticeAreasRouteImport.update({
  id: '/practice-areas',
  path: '/practice-areas',
  getParentRoute: () => rootRouteImport,
} as any)

const ContactRoute = ContactRouteImport.update({
  id: '/contact',
  path: '/contact',
  getParentRoute: () => rootRouteImport,
} as any)

const AboutRoute = AboutRouteImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRouteImport,
} as any)

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

const PracticeAreasIndexRoute = PracticeAreasIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PracticeAreasRoute,
} as any)

const PracticeAreasSlugRoute = PracticeAreasSlugRouteImport.update({
  id: '/$slug',
  path: '/$slug',
  getParentRoute: () => PracticeAreasRoute,
} as any)

interface PracticeAreasRouteChildren {
  PracticeAreasSlugRoute: typeof PracticeAreasSlugRoute
  PracticeAreasIndexRoute: typeof PracticeAreasIndexRoute
}

const PracticeAreasRouteChildren: PracticeAreasRouteChildren = {
  PracticeAreasSlugRoute,
  PracticeAreasIndexRoute,
}

const PracticeAreasRouteWithChildren = PracticeAreasRoute._addFileChildren(
  PracticeAreasRouteChildren,
)

interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  ContactRoute: typeof ContactRoute
  PracticeAreasRoute: typeof PracticeAreasRouteWithChildren
  TeamRoute: typeof TeamRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ContactRoute,
  PracticeAreasRoute: PracticeAreasRouteWithChildren,
  TeamRoute,
}

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact': typeof ContactRoute
  '/practice-areas': typeof PracticeAreasRouteWithChildren
  '/team': typeof TeamRoute
  '/practice-areas/$slug': typeof PracticeAreasSlugRoute
  '/practice-areas/': typeof PracticeAreasIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact': typeof ContactRoute
  '/team': typeof TeamRoute
  '/practice-areas/$slug': typeof PracticeAreasSlugRoute
  '/practice-areas': typeof PracticeAreasIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact': typeof ContactRoute
  '/practice-areas': typeof PracticeAreasRouteWithChildren
  '/team': typeof TeamRoute
  '/practice-areas/$slug': typeof PracticeAreasSlugRoute
  '/practice-areas/': typeof PracticeAreasIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/contact'
    | '/practice-areas'
    | '/team'
    | '/practice-areas/$slug'
    | '/practice-areas/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/contact'
    | '/team'
    | '/practice-areas/$slug'
    | '/practice-areas'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/contact'
    | '/practice-areas'
    | '/team'
    | '/practice-areas/$slug'
    | '/practice-areas/'
  fileRoutesById: FileRoutesById
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/team': {
      id: '/team'
      path: '/team'
      fullPath: '/team'
      preLoaderRoute: typeof TeamRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/practice-areas': {
      id: '/practice-areas'
      path: '/practice-areas'
      fullPath: '/practice-areas'
      preLoaderRoute: typeof PracticeAreasRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/contact': {
      id: '/contact'
      path: '/contact'
      fullPath: '/contact'
      preLoaderRoute: typeof ContactRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/practice-areas/': {
      id: '/practice-areas/'
      path: '/'
      fullPath: '/practice-areas/'
      preLoaderRoute: typeof PracticeAreasIndexRouteImport
      parentRoute: typeof PracticeAreasRoute
    }
    '/practice-areas/$slug': {
      id: '/practice-areas/$slug'
      path: '/$slug'
      fullPath: '/practice-areas/$slug'
      preLoaderRoute: typeof PracticeAreasSlugRouteImport
      parentRoute: typeof PracticeAreasRoute
    }
  }
}

export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
