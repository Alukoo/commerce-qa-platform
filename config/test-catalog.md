# Commerce QA Platform Test Catalog

This catalog maps automated tests to business features.

## Home Module

| Test ID | Feature | Type | Status |
|---------|---------|------|--------|
| HOME-001 | Home page loads | Smoke | Automated |
| HOME-002 | Navigation visible | Functional | Automated |
| HOME-003 | Authentication buttons visible | Functional | Automated |
| HOME-004 | Products displayed | Smoke | Automated |
| HOME-005 | Product names visible | Functional | Automated |
| HOME-006 | Product prices visible | Functional | Automated |
| HOME-007 | Phones category is visible | Functional | Automated |
| HOME-008 | Laptops category is visible | Functional | Automated |
| HOME-009 | Monitors category is visible | Functional | Automated |
| HOME-010 | Category navigation works | Regression | Automated |

## Products Module

| Test ID | Feature | Type | Status |
|---------|---------|------|--------|
| PROD-01 | Product listing loads | Smoke | Automated |
| PROD-02 | Categories are present | Functional | Automated |
| PROD-03 | Filter category works | Functional | Automated |
| PROD-04 | Product detail shows name and price | Functional | Automated |
| PROD-05 | Product image visible on detail | Functional | Automated |
| PROD-06 | Add to cart shows dialog | Functional | Automated |
| PROD-07 | Price is numeric | Functional | Automated |
| PROD-08 | Navigate back to home from detail | Functional | Automated |
| PROD-09 | Pagination Next changes products | Functional | Automated |
| PROD-10 | Add two products updates cart | Functional | Automated |

## Authentication Module (UI)

| Test ID | Feature | Type | Status |
|---------|---------|------|--------|
| AUTH-01 | Valid registration | Regression | Automated |
| AUTH-02 | Existing username registration | Regression | Automated |
| AUTH-03 | Empty username registration shows dialog | Regression | Automated |
| AUTH-04 | Valid login | Smoke | Automated |
| AUTH-05 | Invalid username login shows dialog | Functional | Automated |
| AUTH-06 | Invalid password login shows dialog | Functional | Automated |
| AUTH-07 | Empty username login keeps modal open | Functional | Automated |
| AUTH-08 | Logout clears session | Regression | Automated |
| AUTH-09 | Session persistence after reload | Regression | Automated |
| AUTH-10 | Registration with special characters | Functional | Automated |

## Registration Module

| Test ID | Feature | Type | Status |
|---------|---------|------|--------|
| REG-01 | Valid registration | Regression | Automated |
| REG-02 | Duplicate username registration | Functional | Automated |
| REG-03 | Empty username registration shows dialog | Functional | Automated |
| REG-04 | Empty password registration shows dialog | Functional | Automated |
| REG-05 | Long username registration | Functional | Automated |

## Cart Module

| Test ID | Feature | Type | Status |
|---------|---------|------|--------|
| CART-01 | Add single product to cart | Smoke | Automated |
| CART-02 | Remove product from cart | Functional | Automated |
| CART-03 | Cart shows product name and price | Functional | Automated |
| CART-04 | Quantity update changes totals | Functional | Automated |
| CART-05 | Empty cart shows placeholder | Functional | Automated |
| CART-06 | Cart persists across reload | Regression | Automated |

## Checkout Module

| Test ID | Feature | Type | Status |
|---------|---------|------|--------|
| CHECKOUT-01 | Place order modal opens from cart | Smoke | Automated |
| CHECKOUT-02 | Modal form requires name | Functional | Automated |
| CHECKOUT-03 | Modal form requires credit card | Functional | Automated |
| CHECKOUT-04 | Successful purchase shows confirmation | Functional | Automated |
| CHECKOUT-05 | Purchase modal can be cancelled | Functional | Automated |

## Orders Module

| Test ID | Feature | Type | Status |
|---------|---------|------|--------|
| ORDERS-01 | Order history page accessible when logged in | Functional | Automated |
| ORDERS-02 | Order list shows recent orders | Functional | Automated |
| ORDERS-03 | View order details page | Functional | Automated |
| ORDERS-04 | Order items match purchased items | Functional | Automated |

## Search Module

| Test ID | Feature | Type | Status |
|---------|---------|------|--------|
| SEARCH-01 | Search box is present | Smoke | Automated |
| SEARCH-02 | Typing shows suggestions | Functional | Automated |
| SEARCH-03 | Results match query | Functional | Automated |
| SEARCH-04 | Empty query yields full listing | Functional | Automated |
| SEARCH-05 | Case-insensitive search | Functional | Automated |

## API Module

| Test ID | Feature | Type | Status |
|---------|---------|------|--------|
| API-001 | Products list (smoke) | API | Automated |
| API-002 | Product detail returns 200 | API | Automated |
| API-003 | Response contains Items array | API | Automated |
| API-004 | Product count greater than zero | API | Automated |
| API-005 | Get product detail fields | API | Automated |
| API-011 | Valid login (best-effort) | API | Automated |
| API-012 | Invalid password returns 4xx | API | Automated |
| API-013 | Missing username returns 4xx | API | Automated |
| API-014 | Empty payload returns 4xx | API | Automated |
| API-021 | View cart returns 200 | API | Automated |
| API-022 | Add to cart returns 200 | API | Automated |
| API-023 | Delete invalid item returns 4xx | API | Automated |
| API-024 | Viewcart payload shape | API | Automated |
| API-031 | Purchase request (best-effort) | API | Automated |
| API-032 | Purchase invalid payload negative | API | Automated |
| API-033 | Purchase response contains order id | API | Automated |

## Network Module

| Test ID | Feature | Type | Status |
|---------|---------|------|--------|
| NET-001 | Products network load | Network | Automated |
| NET-011 | Login request payload and response | Network | Automated |
| NET-021 | Add to cart request and payload | Network | Automated |
| NET-031 | Purchase request and payload | Network | Automated |

> Notes: This catalog is maintained from implemented specs under `tests/`. When adding new tests, please update this file or run the tagging helper and then review the catalog.