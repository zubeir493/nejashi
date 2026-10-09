# Mobile screen map

The mobile shell uses a four-tab iOS-style navigation pill. The top-right profile action on Home opens account pages; Account is deliberately not duplicated in bottom navigation. The audiobook mini-player sits above the tab pill while playback is active.

## Primary tabs

| Tab | Main content | Key actions |
| --- | --- | --- |
| Home | Search + profile top bar, new release, collections, popular books, compact continue-reading row | Search, book detail, profile |
| Discover | Subjects, curated collections, authors, popular audiobooks | Category, collection, author, series |
| Library | Owned titles, format filters, progress, download shortcuts | Reader, player, downloads |
| Listen | Continue listening, audiobook shelves, chapter and sleep-timer access | Player, chapters, sleep timer |

## Supporting routes

| Flow | Screens |
| --- | --- |
| First use and access | Splash, onboarding, sign in, sign up |
| Catalog | Search, search results, category, collection, author, series, book detail |
| Purchase | Checkout with referral-code entry, purchase success |
| Reading | Readium host screen, reader settings, bookmarks, highlights and notes |
| Listening | Full player, chapter list, sleep timer, persistent mini-player |
| Library and offline | Library filters, downloads with state/progress, storage management |
| Account | Profile, devices, purchases, app/reader settings, help, referral invite |

## Prototype behavior

The current mobile implementation is an interactive UI scaffold with sample catalog data. Navigation, format selection, filters, playback state, download status examples, reader preferences, and referral-code presentation are present for design review. Checkout completion is a visual prototype state; it is not connected to Chapa or entitlement issuance. The reader screen is a native integration host concept and does not replace Readium. The next implementation pass connects these screens to the Laravel API, verified payment state, Readium, and device-bound offline licenses.
