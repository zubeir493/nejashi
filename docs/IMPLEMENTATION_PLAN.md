# Phased implementation plan

## Foundation — in place

- Monorepo boundaries, Laravel 13 / React Native 0.84 scaffolds, PostgreSQL, Sanctum, Filament 5, Horizon, API conventions, and media/payment decisions.
- Initial domain migrations, sky-blue iOS-style design system, modular mobile navigation, and interactive screen scaffolds for the main product journeys.

## 1. Catalog and publishing

- Work → Edition → Publication CRUD, contributor credits, categories, and curated home sections in Filament.
- Private upload intake, queued validation/conversion, samples, catalog/search/read endpoints, and fixture content.

## 2. Identity and purchase

- Email/phone OTP with replaceable delivery adapters, device registration/revocation, catalog detail and account flows.
- Products, prices, order snapshots, Chapa hosted checkout, verified idempotent webhook, and entitlement issuance; cover the listed payment/format/bundle invariants with automated tests before enabling live payments.
- Referral link resolution, discount eligibility, and post-verification commission.

## 3. Library and reading

- Library shelves, bookmarks/annotations, offline progress outbox and conflict acknowledgements.
- Readium Swift/Kotlin spike, React Native native bridge, EPUB samples, protected package delivery, and LCP client/server certification work.

## 4. Listening and offline

- Chapter-based audio pipeline, segmented streaming, background/lock-screen player, speed/seek/sleep controls, and resume sync.
- Device-bound offline audio package/license lifecycle, storage controls, retry states, and revocation tests.

## 5. V1 polish and release

- Connect the Home/Discover/Search/Detail/Checkout/Library/Reader/Player/Account screen scaffolds to real API state; finish accessible English/Amharic/Arabic layouts, performance and operational alerts, support/admin workflows, and store builds.
- Run end-to-end payment, entitlement, device/license, download, offline progress, and duplicate-event verification before production rollout.
