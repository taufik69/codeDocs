---
Project: Application-Infrastructure-Audit (src/core-logic)
Status: 🚨 Optimization Required
Priority: 🔴 High (Bundle Size & Logic Bloat)
Module: Contexts, Data-Store, Custom-Hooks, API-Layer, Icons
Tags:
  [
    "Bundle-Optimization",
    "State-Management-Refactor",
    "Data-Persistence-Fix",
    "Type-Enforcement",
    "Icon-Architecture",
  ]
Search-Keywords:
  [
    "db-data-bloat-fix",
    "app-context-cleanup",
    "axios-unification",
    "svg-icon-optimization",
    "swr-cache-key-fix",
    "hydration-mismatch-hooks",
  ]
---

# Infrastructure & Logic Layer Analysis & Refactoring Guide

Here is the complete analysis of your application's core logic, data structures, and infrastructure. This audit identifies significant technical debt in state management and a critical performance issue regarding bundled data.

---

## 1. Analysis Table (Infrastructure & Data Detail)

| Layer / File Path | Issues Identified | Risk Level |
| :--- | :--- | :--- |
| [src/contexts/app-context/AppContext.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/contexts/app-context/AppContext.tsx) | Severe: 600+ lines with 50% dead (commented) code. Mixing state with business logic. | High |
| [src/data/db.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/data/db.ts) | **Critical**: 420KB file (14,000+ lines) of mock data bundled into the client build. | Critical |
| [src/data/navigations.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/data/navigations.ts) | 80KB of hardcoded menu data. Should be moved to a CMS or dynamic API. | Medium |
| [src/hooks/useFetcher.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/hooks/useFetcher.ts) | Manual token injection in SWR keys complicates cache management. | Medium |
| [src/hooks/useWindowSize.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/hooks/useWindowSize.ts) | Returns 'null' initially, triggering hydration flashes and layout shifts. | Medium |
| [src/components/icon/Icon.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/components/icon/Icon.tsx) | Loads SVG files via HTTP (react-svg) instead of using an optimized SVG sprite/icon set. | Medium |
| [src/lib/axiosClient.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/lib/axiosClient.ts) | Good interceptor logic but exists alongside a redundant 'axios.ts' file. | Low |
| [src/models/product.model.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/models/product.model.ts) | Defined but rarely enforced in UI components (wide use of 'any'). | Medium |

---

## 2. Current Problems & Issues

### 2.1. Critical Bundle Bloat (db.ts)
- **Issue:** The file [src/data/db.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/data/db.ts) contains a massive array of objects (14,800+ lines).
- **Impact:** This data is directly imported into the application. It significantly increases the JavaScript bundle size, leading to slower page loads and higher memory usage on mobile devices. This data should be in a database, not hardcoded in the source code.

### 2.2. Context Logic Pollution & Dead Code
- **Issue:** [AppContext.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/contexts/app-context/AppContext.tsx) is a "God Object" containing ~300 lines of commented-out graveyard code and complex B2B pricing logic.
- **Impact:** Makes global state management difficult to debug. Changes to the cart logic risk breaking the entire state machine because the code is tightly coupled.

### 2.3. Unoptimized Icon Delivery
- **Issue:** The [Icon](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/components/icon/Icon.tsx#11-21) component uses `react-svg` to fetch standalone `.svg` files from static assets for every icon usage.
- **Impact:** Each icon requires a separate HTTP request or a dynamic fetch. On pages with many icons, this can cause significant "flicker" and increase the number of network requests unnecessarily.

### 2.4. Network Client Fragmention
- **Issue:** There are two different Axios instances ([axios.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/lib/axios.ts) and [axiosClient.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/lib/axiosClient.ts)) with inconsistent base configurations.
- **Impact:** Leads to bugs where auth tokens are missing on some requests or mock data is accidentally turned on in production environments.

---

## 3. Suggested Improvements & Refactoring Plan

### 3.1. Externalize the Mock Database
- **Action:** Move the content of [db.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/data/db.ts) to an external JSON file or, better yet, a server-side JSON file that is fetched only when needed.
- **Benefit:** Reduces the main JS bundle by ~400KB instantly.

### 3.2. Sanitize AppContext
- **Action:** Move pricing and cart logic to `src/services/cartService.ts`. Delete all commented-out code blocks. 
- **Benefit:** Results in a lightweight, readable state provider.

### 3.3. Optimize Icon System
- **Action:** Convert the SVG-based system to an Icon Font or an SVG Sprite system where all icons are loaded in a single request.
- **Benefit:** Faster rendering and better performance for UI-heavy pages.

### 3.4. Unify API Clients
- **Action:** Merge all Axios configurations into a single `src/lib/api.ts` with environment-based switching.
- **Benefit:** Consistent authentication and error handling across the entire app.

---

### Summary Checklist for the Developer:

- [ ] Move [db.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/data/db.ts) data to an external API or JSON file to reduce bundle size.
- [ ] Purge all commented-out code from [AppContext.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/contexts/app-context/AppContext.tsx) and [types.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/contexts/app-context/types.ts).
- [ ] Abstract B2B pricing logic out of the Context into a standalone utility.
- [ ] Replace [axios.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/lib/axios.ts) and [axiosClient.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/lib/axiosClient.ts) with a unified API client.
- [ ] Fix the hydration mismatch in [useWindowSize](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/hooks/useWindowSize.ts#6-24) by adding a "client-ready" flag.
- [ ] Standardize the use of `src/models` to replace `any` across the logic layer.
- [ ] Consolidate navigation data to prevent huge file sizes in `navigations.ts`.
