# Nejashi mobile design system

Nejashi Digital Books uses a quiet, native iOS visual language. Books and publication artwork carry the editorial character. The interface stays light, direct, and easy to scan, with sky blue as the primary color.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `background` | `#FFFFFF` | Main light-mode canvas |
| `canvas` | `#F7FAFC` | Subtle page and sheet contrast |
| `surfaceSubtle` | `#F3F8FB` | Search, secondary controls, quiet surfaces |
| `blue` | `#58B6E6` | Primary actions and progress |
| `blueDeep` | `#167DAE` | Text/icons on pale blue surfaces |
| `blueSoft` | `#EAF6FC` | Selected controls and quiet emphasis |
| `ink` | `#142333` | Main text |
| `body` | `#536678` | Supporting text |
| `muted` | `#8293A2` | Metadata and inactive icons |
| `line` | `#E8EEF2` | Dividers and outlines |
| `mint` | `#EAF4F0` | Success and secure states |
| `sand` | `#F5F0E6` | Warm contrast for publication art |
| `night` | `#101C28` | Audiobook player surface |

## Type and spacing

The interface uses the platform sans-serif by default: San Francisco on iOS and the platform system font on Android. Navigation, buttons, titles, metadata, and forms use the same family. Publication covers keep their publisher typography. The native reader offers user-selected typefaces independently of the app UI.

Use a 4-point spacing base (`4, 8, 12, 16, 22, 30, 42`). Buttons and search controls use capsule shapes; content sheets use 16–22 point corners; book covers preserve their publication ratio with a small corner radius. Layout uses logical start/end edges and honors text scaling.

## Components and behavior

- Primary actions use a sky-blue capsule with a 50-point minimum height. Secondary actions use a quiet outline or text treatment.
- Home has no greeting or wordmark in its header. Its top row is a search capsule beside the profile action. The profile action stays at the upper right, so Account does not appear a second time in the tab bar.
- Bottom navigation is one slim floating pill: Home, Discover, Library, Listen. The selected item uses blue.
- A compact mini-player appears above the navigation pill only while audio is playing. Continue reading/listening stays a secondary progress row.
- Shelf headings carry one restrained action such as “See all”; sections do not each sit inside their own card.
- Book detail chooses format-specific rights and prices. Samples remain separate from purchase actions.
- Download states are queued, downloading, paused, downloaded, failed, and retrying. Storage and license state are visible without exposing raw file paths.
- Loading, offline, error, and empty states use the same typography, spacing, and control hierarchy as content screens.
- Motion is brief and functional: stack transitions, player expansion, download progress, and reader settings sheets.

## Language, reading, and accessibility

English, Amharic, and Arabic are app locales. Publication language is selected per edition and does not change the app locale. The reader respects EPUB directionality and uses Readium for Arabic RTL, Ethiopic script, pagination, text size, font choice, themes, and line spacing. Numbers, prices, ISBNs, and Latin names preserve their intended direction inside RTL layouts.

All icon-only controls have accessibility labels. Touch targets are at least 44 points where practical. Interfaces respect dynamic type and reduced-motion settings. Contrast is checked for text and selected states in the light palette.
