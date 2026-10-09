# Protected media and offline access

## Asset pipeline

```text
private master upload → validation/scan → queued conversion → protected output → private S3-compatible bucket → authorized CDN delivery
```

Master EPUB/audio objects and processing outputs are never public. Asset rows store opaque object keys, checksum, size, media type, pipeline version, and status. Admin upload credentials are short-lived and restricted to a staging prefix. Publishing copies approved outputs to a private bucket; public cover thumbnails and marketing images use a separate, explicitly public derivative pipeline.

Every sample, stream, license, or download request first checks the user/device and exact publication entitlement. Delivery uses short-lived URLs/tokens or an authenticated CDN policy with a private origin. Do not persist long-lived signed URLs in the app or return bucket credentials. CDN cache keys and authorization must preserve per-request access checks.

## Readium and LCP

Readium Mobile is implemented in Swift and Kotlin and supports EPUB navigation, preferences, search, annotations, RTL, and audiobook playback. The React Native layer will call a small local native bridge; the JS feature owns presentation and sync while Readium owns publication parsing/rendering and native media integration. There is no official React Native Readium renderer, so keep the bridge narrow and pin each native toolkit to a tested release.

Use Readium LCP for protected EPUB and, after a format/device spike, protected packaged audiobooks (`.lcpa`). LCP requires EDRLab client certification and the private `R2LCPClient` component; start that vendor onboarding before promising LCP support in production. Keep license issuance/renewal on the backend and bind licenses to a registered device. Store license material and unwrapped content keys only in platform-secure storage. The app's ordinary files area must never contain a shareable EPUB/audio source file.

## Audiobook delivery

Streaming uses segmented HLS with opaque segment keys in private storage. Laravel authorizes a playback session and returns a short lease; CDN access is scoped to the manifest/segments and expires quickly. The player uses native background audio controls, resumes by chapter and millisecond position, and renews the lease while online. Never give the app a long-lived raw MP3/M4A URL.

For offline, package chapters per audiobook publication and encrypt them for a device license. Keep packages in application-private storage, exclude them from backup/file sharing, and wrap local keys with Android Keystore or iOS Keychain. Renew or revoke licenses when online; honor a bounded offline period. If the selected Readium LCP flow cannot cover packaged audio consistently, use a commercial audio DRM provider rather than inventing a cryptographic scheme.

## Local state and threat boundary

Bearer credentials and DRM/license secrets use native secure storage, never AsyncStorage or plain app preferences. Protected packages live in the app sandbox. Download records expose `queued`, `downloading`, `paused`, `downloaded`, `failed`, and `retrying`; deleting a download removes encrypted bytes and its local license handle. Server state can revoke a device, while acknowledging that a determined user can capture decoded screen/audio output.

## Processing jobs

Upload completion enqueues format validation, malware scan, EPUB inspection/manifest generation, sample extraction, audio metadata extraction, chapter split/transcode, protected packaging, checksum recording, and CDN publication. Each job is versioned and repeat-safe. HTTP requests only create the asset and return its processing state.
