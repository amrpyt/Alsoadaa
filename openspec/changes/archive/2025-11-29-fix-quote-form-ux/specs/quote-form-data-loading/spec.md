# Quote Form Data Loading

Ensures the Quote Request Form loads product data reliably and provides clear feedback during data fetching operations.

## ADDED Requirements

### Requirement: Products must load successfully in Step 2

The quote request form Step 2 (Product Selection) MUST fetch and display all available products from Sanity CMS with clear loading feedback.

**Priority:** Critical  
**Component:** `QuoteRequestForm.tsx`

#### Scenario: Products load successfully on form mount

**Given** the user opens the quote request form  
**When** the form renders Step 2 (Product Selection)  
**Then** products are fetched from Sanity using `allProductsQuery`  
**And** a loading spinner is displayed while fetching  
**And** products are displayed in a grid with images and names once loaded  
**And** the loading spinner is hidden when products are ready

#### Scenario: Products are cached for faster subsequent loads

**Given** products were successfully loaded previously  
**When** the user returns to Step 2  
**Then** cached products from localStorage are displayed immediately  
**And** fresh products are fetched in the background  
**And** the display updates if new products are available

#### Scenario: Loading state shows skeleton UI

**Given** products are being fetched from Sanity  
**When** the loading state is active  
**Then** product card skeleton loaders are displayed  
**And** the skeleton loaders match the final product card layout  
**And** at least 6 skeleton cards are shown (expected product count)

### Requirement: Product fetch errors must be handled gracefully

When product fetching fails, users MUST receive clear feedback and recovery options.

**Priority:** Critical  
**Component:** `QuoteRequestForm.tsx`

#### Scenario: Network error displays user-friendly message

**Given** the Sanity API is unreachable  
**When** the product fetch attempt fails  
**Then** an error message "Unable to load products. Please check your connection." is displayed  
**And** a "Retry" button is shown  
**And** the error is logged to console with full details  
**And** the form does not crash or show blank screen

#### Scenario: User can retry failed product fetch

**Given** product fetch failed with a network error  
**When** the user clicks the "Retry" button  
**Then** the product fetch is attempted again  
**And** a loading spinner is shown during retry  
**And** on success, products are displayed normally  
**And** on failure, the error message persists

#### Scenario: Automatic retry with exponential backoff

**Given** the initial product fetch fails  
**When** the error is a temporary network issue  
**Then** the system automatically retries after 2 seconds  
**And** if that fails, retries again after 4 seconds  
**And** if that fails, retries one final time after 8 seconds  
**And** after 3 failures, shows manual retry option  
**And** each retry attempt is logged

### Requirement: Product data must be language-aware

Products displayed in the form MUST respect the user's selected language.

**Priority:** High  
**Component:** `QuoteRequestForm.tsx`

#### Scenario: Products display in Arabic when Arabic is selected

**Given** the user has selected Arabic as their language  
**When** products are fetched  
**Then** the `lang: 'ar'` parameter is passed to `allProductsQuery`  
**And** product titles are displayed in Arabic  
**And** product categories are displayed in Arabic  
**And** RTL layout is applied to product cards

#### Scenario: Products refresh when language changes

**Given** products are displayed in English  
**When** the user switches to Russian  
**Then** products are re-fetched with `lang: 'ru'`  
**And** product titles update to Russian  
**And** existing selections are preserved by product ID  
**And** a loading state shows during language switch

### Requirement: Form must handle empty product list

When no products are available in Sanity, the form MUST display an appropriate message.

**Priority:** Medium  
**Component:** `QuoteRequestForm.tsx`

#### Scenario: No products available shows empty state

**Given** Sanity CMS has zero published products  
**When** the product fetch completes successfully  
**Then** an empty state message is displayed: "No products currently available"  
**And** a "Contact Sales" button is shown  
**And** the Next button remains disabled  
**And** an alert email is sent to administrators

### Requirement: Product images must load reliably

Product images from Sanity CDN MUST load with proper fallbacks.

**Priority:** Medium  
**Component:** `QuoteRequestForm.tsx`

#### Scenario: Product image loads successfully

**Given** a product has a valid image URL from Sanity  
**When** the product card is rendered  
**Then** the image loads from Sanity CDN  
**And** alt text is set to product title  
**And** loading="lazy" is applied for performance

#### Scenario: Broken image shows fallback

**Given** a product image URL is invalid or returns 404  
**When** the image fails to load  
**Then** a placeholder icon is shown instead  
**And** the product card remains functional  
**And** the error is logged but not shown to user

## MODIFIED Requirements

### Requirement: Form state must persist across sessions (existing, now enhanced)

The existing form persistence MUST now also cache fetched products to improve performance.

**Previously:** Only form field data was persisted  
**Now:** Form data AND fetched products are cached in localStorage

#### Scenario: Cached products reduce loading time

**Given** products were fetched 10 minutes ago  
**When** the user returns to the form  
**Then** cached products are displayed immediately (< 100ms)  
**And** a background refresh fetches latest products  
**And** the UI updates if new products are added

#### Scenario: Stale cache is refreshed

**Given** cached products are older than 24 hours  
**When** the form loads  
**Then** cached products are discarded  
**And** fresh products are fetched from Sanity  
**And** a loading spinner is shown during fetch
