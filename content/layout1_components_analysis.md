---
Project: Homepage-Layout-Optimization
Status: 🚀 Performance-Audit
Priority: 🔴 High (SEO & LCP Critical)
Module: Layout-1 (Market, Fashion, Grocery, Furniture)
Tags:
  [
    "NextJS-Server-Components",
    "Parallel-Fetching",
    "SEO-Optimization",
    "Code-Dry",
    "Web-Performance",
  ]
Search-Keywords:
  [
    "promise-all",
    "sequential-vs-parallel",
    "metadata-seo",
    "layout-refactoring",
    "watermark-abstraction",
  ]
---

# Layout-1 (Homepages) Components Analysis & Refactoring Guide

Here is the complete analysis of your `layout-1` directory, which manages all the different index page variants like `market-1`, `fashion-1`, `grocery-3`, and `furniture-shop`. You can easily copy and paste everything below into **Notion**.

---

## 1. Current Problems & Issues

### 1.1. Sequential Data Fetching (Major Performance Bottleneck)

- **Issue:** In the server-side pages (e.g., [fashion-1/page.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28layout-1%29/fashion-1/page.tsx), [grocery-3/page.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28layout-1%29/grocery-3/page.tsx), [furniture-shop/page.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28layout-1%29/furniture-shop/page.tsx)), multiple API calls are being `await`ed one after the other sequentially.
  - _Example from [fashion-1/page.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28layout-1%29/fashion-1/page.tsx):_
    ```typescript
    const hotDealList = await api.getHotDealList();
    const serviceList = await api.getServiceList();
    const flashDealsData = await api.getFlashDeals();
    // ... 3 more await calls
    ```
- **Impact:** The server has to wait for API 1 to finish before it even _starts_ API 2. The total load time becomes the sum of all 6 API times combined. This significantly slows down the initial page load for users and drastically reduces your PageSpeed Insights score.

### 1.2. Inconsistent Data Fetching Strategy (Server vs. Client)

- **Issue:** There is a massive structural inconsistency between the different homepage layouts.
  - `fashion-1`, `grocery-3`, and `furniture-shop` fetch data natively on the Server and pass the data directly into their section components as props. **(Best Practice ✅)**
  - Conversely, [market-1/page.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28layout-1%29/market-1/page.tsx) fetches zero data on the server. Instead, it renders wrapper components (like `<Section1 />`), which are forced to use `"use client"` and trigger `useFetcher`/`useEffect` hooks to load their own data on the browser. **(Bad Practice ❌)**
- **Impact:** The `market-1` homepage is visually empty when requested by Google's SEO bots and forces users to stare at multiple independent loading spinners instead of delivering a fast, pre-rendered page.

### 1.3. Missing SEO / Metadata Definitions

- **Issue:** None of these critical homepage layout files utilize the Next.js [generateMetadata](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28b2b-products%29/b2bproduct/%5Bslug%5D/page.tsx#744-771) function or export a `metadata` constant.
- **Impact:** Since these are the landing pages for categories like Fashion, Grocery, etc., failing to provide custom Titles, Descriptions, and OpenGraph images directly hurts search engine ranking.

### 1.4. Copy-Pasted Visual Elements (Watermarks)

- **Issue:** The `tizaraa_watermark` `<NextImage />` component with its massive inline CSS `style={{ position: 'fixed', opacity: 0.1... }}` is being manually copy-pasted directly inside the [page.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28layout-1%29/market-1/page.tsx) files (like in `market-1`).
- **Impact:** Code duplication. If the marketing team wants to change the watermark image or its opacity, a developer has to hunt down and replace it in every single page file individually.

---

## 2. Suggested Improvements & Refactoring Plan

### 2.1. Implement Parallel Data Fetching (`Promise.all`)

- **Action:** Refactor all server-side page components (`fashion-1`, `grocery-3`, `furniture-shop`) to run their API requests concurrently rather than sequentially.
- **Example Fix:**

  ```typescript
  export default async function FashionOne() {
    const [
      hotDealList,
      serviceList,
      flashDealsData,
      trendingItems,
      newArrivalsData,
      dealOfTheWeek,
    ] = await Promise.all([
      api.getHotDealList(),
      api.getServiceList(),
      api.getFlashDeals(),
      api.getTrendingItems(),
      api.getNewArrivals(),
      api.getDealOfTheWeekList(),
    ]);

    // Return standard JSX...
  }
  ```

- **Why:** The page will now correctly load as fast as the _slowest single API call_, rather than the sum of all their times combined. This will speed up homepage loading drastically.

### 2.2. Standardize `market-1` to Server Components

- **Action:** Move the API calls out of the individual client components (like [Section1.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/page-sections/market-1/Section1.tsx)) inside `market-1` and hoist them up to the [market-1/page.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28layout-1%29/market-1/page.tsx) Server Component.
- **Why:** Makes the codebase consistent across all layout files, solves the SEO problems for the market layout, and stops users from seeing an ugly "waterfall" of loading spinners.

### 2.3. Abstract the Background Watermark into a Layout wrapper

- **Action:** Create a reusable component `<GlobalWatermark />`. Remove the copy-pasted `<NextImage>` code from individual pages, and insert `<GlobalWatermark />` either into the master `layout-1/layout.tsx` file or as a single component drop-in.

### 2.4. Add SEO Metadata Exports to All Landing Pages

- **Action:** At the top of each [page.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28layout-1%29/market-1/page.tsx) file (`fashion-1`, `market-1`, etc.), add the Next.js metadata export:
  ```typescript
  export const metadata: Metadata = {
    title: "Tizaraa | Fashion & Clothing",
    description: "Shop the best fashion deals on Tizaraa.",
  };
  ```

---

### Summary Checklist for the Developer:

- [ ] Refactor `fashion-1`, `grocery-3`, and `furniture-shop` to use `Promise.all` for parallel API fetching.
- [ ] Refactor `market-1` data fetching out of Client components ([Section1.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/page-sections/market-1/Section1.tsx)) into the Server [page.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28layout-1%29/market-1/page.tsx) file for SEO consistency.
- [ ] Create a `<GlobalWatermark />` component and remove repeated inline code.
- [ ] Add `export const metadata` to all landing pages to fix missing SEO.
