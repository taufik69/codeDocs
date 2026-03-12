---
Project: Core-Logic-Audit (Services, Theme, Utils, Middleware)
Status: 🚨 Refactor Recommended
Priority: 🔴 Medium (Architectural Integrity)
Module: src/services, src/theme, src/utils, src/middleware
Tags:
  [
    "Core-Logic-Optimization",
    "Theme-System-Cleanup",
    "Auth-Security-Review",
    "Middleware-Efficiency",
    "Utility-Logic-Centralization",
  ]
Search-Keywords:
  [
    "authservice-dead-code-cleanup",
    "middleware-route-management",
    "theme-switching-logic-fix",
    "discount-calculation-standardization",
    "currency-formatter-bdt",
  ]
---

# Core Logic Analysis & Refactoring Guide

Here is the complete analysis of your application's service layer, theme management, utility functions, and routing middleware. This audit identifies technical debt in how business logic is distributed and how the theme system is currently implemented.

---

## 1. Analysis Table (Core Logic Detail)

<table>
  <thead>
    <tr>
      <th>Layer / File Path</th>
      <th>Issues Identified</th>
      <th>Risk Level</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>src/services/authService.ts</code></td>
      <td>Technical Debt: ~50% of the file is commented-out "graveyard code". Inconsistent storage (Token in Cookies vs UserInfo in LocalStorage).</td>
      <td>Medium</td>
    </tr>
    <tr>
      <td><code>src/middleware.ts</code></td>
      <td>Scalability: Hardcoded route arrays (<code>isProtectedPath</code>) in index file. Functional but will become hard to maintain as pages grow.</td>
      <td>Low</td>
    </tr>
    <tr>
      <td><code>src/theme/themeOptions.ts</code></td>
      <td>Architectural Noise: Contains multiple switch cases that all resolve to the same <code>DEFAULT</code> theme. Redundant logic for many shops.</td>
      <td>Low</td>
    </tr>
    <tr>
      <td><code>src/utils/utils.ts</code></td>
      <td>Business Logic Leak: <code>calculateDiscount</code> logic is hardcoded (Price - Discount). Currency is globally hardcoded to "BDT".</td>
      <td>Medium</td>
    </tr>
  </tbody>
</table>

---

## 2. Current Problems & Issues

### 2.1. Service Layer Graveyard (authService.ts)
- **Issue:** The [authService.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/services/authService.ts) file is cluttered with multiple versions of the same functions (login, isAuthenticated, logout) commented out.
- **Impact:** Extremely confusing for new developers. It's unclear which storage strategy (Cookies vs LocalStorage) is the primary source of truth, leading to potential bugs where one is updated but the other isn't.

### 2.2. Hardcoded Route Security (middleware.ts)
- **Issue:** The middleware relies on static arrays like `isProtectedPath` defined directly in the main function.
- **Impact:** As the application adds more dashboards (Vendor, Admin, Customer) and dynamic sub-pages, this list will become a maintenance bottleneck and a security risk if a new sensitive route is forgotten.

### 2.3. Pseudo-Theme Switching (themeOptions.ts)
- **Issue:** The [getThemeOptions](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/theme/themeOptions.ts#53-113) function contains 10+ switch cases for different shops (grocery, gadget, fashion), but over 70% of them currently return the `DEFAULT` theme.
- **Impact:** Excessive code for no actual design benefit. It suggests that specific themes were planned but never implemented, leaving behind "empty" architectural logic.

### 2.4. Hardcoded Business Rules (utils.ts)
- **Issue:** The [calculateDiscount](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/utils/utils.ts#60-71) function implements a flat subtraction logic (`price - discount`) and forces the result into the "BDT" currency using the [currency()](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/utils/utils.ts#76-97) utility.
- **Impact:** If the business model changes to percentage-based discounts or expands to international markets (USD, EUR), this low-level utility will break many parts of the application simultaneously.

---

## 3. Suggested Improvements & Refactoring Plan

### 3.1. Purge Auth Technical Debt
- **Action:** Delete all commented-out code in [authService.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/services/authService.ts). Standardize on a single "UserInfo" fetching pattern (either LocalStorage or a separate API call).
- **Benefit:** Clean, reliable authentication logic.

### 3.2. Centralize Route Configuration
- **Action:** Move the protected and auth specific paths into a separate constants file (`src/constants/routes.ts`).
- **Benefit:** Cleaner middleware and easier route management.

### 3.3. Consolidate Theme Logic
- **Action:** Simplify the switch statement in [themeOptions.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/theme/themeOptions.ts) to only include paths that actually have unique designs (Furniture, Health, Gift). Use a default fallback for all other shops.
- **Benefit:** Significant reduction in architectural noise.

### 3.4. Decouple Utility Logic
- **Action:** Refactor [calculateDiscount](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/utils/utils.ts#60-71) to accept a calculation type (FLAT or PERCENT). Refactor the [currency](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/utils/utils.ts#76-97) function to use a configurable default currency instead of hardcoding "BDT".
- **Benefit:** Prepares the codebase for multi-currency support and future pricing strategies.

---

### Summary Checklist for the Developer:

- [ ] Delete all dead code from [authService.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/services/authService.ts).
- [ ] Centralize middleware path configuration into a separate constants file.
- [ ] Clean up redundant switch cases in [themeOptions.ts](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/theme/themeOptions.ts).
- [ ] Update [calculateDiscount](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/utils/utils.ts#60-71) to support percentage calculations if needed.
- [ ] Decouple hardcoded "BDT" currency from the core formatting utility.
- [ ] Ensure [getUser](file:///c:/Omor%20Faruk/Office%20Work/FrontEnd-Demo-Project_Tizaraa/src/services/authService.ts#148-153) in `authService` handles server-side rendering (SSR) safely.
