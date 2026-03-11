---
Project: Main-App-Flow-Refactor (Layout-3)
Status: 🚨 Critical Fix Required
Priority: 🔴 Urgent (Hydration & SEO Risks)
Module: Layout-3 (Products, Checkout, Shops, Category)
Tags:
  [
    "NextJS-Server-Components",
    "Hydration-Fix",
    "ISR-Caching",
    "SEO-Performance",
    "Code-Cleanup",
  ]
Search-Keywords:
  [
    "async-client-component-fix",
    "revalidate-isr",
    "checkout-flash-fix",
    "skeleton-loader",
    "watermark-abstraction",
  ]
---

# Layout-3 (Main App Flow) Components Analysis & Refactoring Guide

Here is the complete analysis of your `layout-3` directory, which manages the core of the application including `product` details, `checkout`, `customer-dashboard`, `shops`, and `category` pages. You can copy and paste this directly into **Notion**.

---

## 1. Current Problems & Issues

### 1.1. Critical Next.js Anti-Pattern Error (Async Client Components)

- **Issue:** In `shops/[slug]/page.tsx`, the file starts with `"use client";` at Line 1, but then incorrectly declares the component as `export default async function ShopDetails()`.
- **Impact:** **This is a fatal React/Next.js bug.** Client Components _cannot_ be `async` functions. Doing this will cause severe hydration errors, potential white-screens on the browser, and console warnings.

### 1.2. Client-Side SEO Destruction

- **Issue:** Both `category/[slug]/page.tsx` and `shops/[slug]/page.tsx` use the `"use client"` directive at the very top of their page files.
- **Impact:** By making the root category and shop routing pages into Client Components, you completely strip away Next.js's ability to crawl or index the HTML for search engines (Google). There is also no [generateMetadata](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28b2b-products%29/b2bproduct/%5Bslug%5D/page.tsx#744-771) in these files, destroying SEO for your sellers and categories.

### 1.3. Bypassing Next.js Caching Entirely

- **Issue:** In `product/[slug]/page.tsx`, you have explicitly added:
  ```typescript
  export const dynamic = "force-dynamic";
  export const revalidate = 0;
  // And fetch uses: cache: 'no-store'
  ```
- **Impact:** You have completely disabled the Next.js cache for Product Details pages. This means _every single time_ a customer clicks a product, your Node server has to re-generate the page from scratch and your backend database takes a hit. For an eCommerce site where products don't change every microsecond, this will drastically inflate your server bills and slow down the TTFB (Time To First Byte).

### 1.4. Flashing UI / Hydration Risks in Checkout

- **Issue:** The [(checkout)/checkout/page.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28layout-3%29/product/%5Bslug%5D/page.tsx#274-277) file syncs the shopping cart by reading from `localStorage` inside a `useEffect` hook.
- **Impact:** Because `localStorage` is only available on the client browser, the server renders the checkout page with an empty cart (`$0` total). Then, milliseconds later, the browser runs the `useEffect`, finds the cart, and the screen dramatically "flashes" and updates to show the real cart. This looks unprofessional and triggers React hydration mismatches.

### 1.5. Massive Code Duplication (Watermark Component)

- **Issue:** Identical to Layout 1 & 2, the `tizaraa_watermark` `<NextImage />` code with 15+ lines of inline css (`style={{ position: 'fixed', opacity: 0.1... }}`) is manually copy-pasted into the `product` page, the `checkout` page, and countless others.
- **Impact:** Unmaintainable code.

### 1.6. Graveyard of Commented Code

- **Issue:** `product/[slug]/page.tsx` has **172 lines** of commented out code before the actual file even starts. [checkout/page.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28layout-3%29/%28checkout%29/checkout/page.tsx) has 150 lines of commented code.
- **Impact:** Bloats file sizes significantly and makes it extremely frustrating for developers to read or debug the file.

---

## 2. Suggested Improvements & Refactoring Plan

### 2.1. Fix the `async` Client Component Crash

- **Action:** In `shops/[slug]/page.tsx` and `category/[slug]/page.tsx`, **remove** `"use client"`. Change them to true Server Components. Pass the `slug` variable downward into isolated Client Components (like `<SearchResult slug={slug} />`) if client-side interactions are absolutely required.

### 2.2. Re-enable Caching (Revalidation) for Products

- **Action:** Remove `force-dynamic` and `revalidate = 0` from the Product Details page. Instead, use Time-Based Revalidation (ISR).
- **Example Fix:**
  ```typescript
  // Re-generate the page every 60 seconds at most
  export const revalidate = 60;
  ```
- **Why:** 99% of your users will now get an incredibly fast, cached HTML version of the product page, whilst still ensuring the data gets occasionally refreshed for stock/price changes.

### 2.3. Abstract the Background Watermark Globally

- **Action:** Stop copy-pasting the Watermark `<NextImage>`. Extract it into its own file (`src/components/GlobalWatermark.tsx`) and inject it exactly once inside `layout-3/layout.tsx`.

### 2.4. Refactor Checkout Cart Loading

- **Action:** Instead of returning `null` while waiting for `useEffect` to sync the cart, render a beautiful Skeleton Loader so the user sees a smooth transition, rather than a blank white page that snaps into the checkout form violently.

### 2.5. Delete the Dead Code

- **Action:** Highlight lines 1 through 172 in `product/[slug]/page.tsx`. Press Backspace. Rely on Git branch history to save your old code.

---

### Summary Checklist for the Developer:

- [ ] Remove `"use client"` and fix `async` bug in `shops/[slug]/page.tsx` and `category/[slug]/page.tsx`.
- [ ] Implement Time-based Revalidation (`revalidate = 60`) on the Product details page instead of forcing `no-store`.
- [ ] Create a `<GlobalWatermark />` component and put it in [layout.tsx](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/app/%28auth%29/layout.tsx). Remove it from individual pages.
- [ ] Add a visual skeleton loading state to the Checkout page while pulling `localStorage` carts.
- [ ] Delete all commented-out code blocks across the `layout-3` directory.
