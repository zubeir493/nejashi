# API conventions

## Surface

- Prefix all app endpoints with `/api/v1` and return JSON resources with stable IDs, localized display fields, and explicit format/ownership data.
- Public catalog reads are cacheable. User library, purchase, device, progress, and download routes require `auth:sanctum` and an active device session where the operation is device-bound.
- Use Laravel Form Requests for input validation, Policies for object authorization, API Resources for response shape, and module application actions for business operations.
- Paginate long lists by cursor. Return `meta` for pagination and request IDs for support; use standard HTTP status codes and a stable `{error: {code, message, details}}` envelope for failures.
- Send an `Idempotency-Key` for order creation, payment initialization, download/license issuance, and progress batches. Server-side keys are scoped to the user and operation.

## Initial route map

```text
POST   /api/v1/auth/otp/request
POST   /api/v1/auth/otp/verify
POST   /api/v1/auth/logout
GET    /api/v1/home
GET    /api/v1/search?q=...
GET    /api/v1/works/{work}
GET    /api/v1/works/{work}/samples/{publication}
GET    /api/v1/library
POST   /api/v1/orders
POST   /api/v1/orders/{order}/checkout/chapa
GET    /api/v1/orders/{order}
POST   /api/v1/devices
POST   /api/v1/publications/{publication}/licenses
POST   /api/v1/progress/sync
POST   /api/v1/referrals/resolve
POST   /api/v1/webhooks/chapa
```

Catalog payloads group format choices under one Work/Edition detail response. Each offer returns its own product, current price, format availability, and `owned` state for the signed-in user. The client never decides ownership from an order response.

## Authentication

Use Sanctum personal access tokens for the native app, named for a registered device and revocable from Account → Devices. The token is returned once and stored only in Keychain/Keystore-backed storage. The OTP delivery provider can change without altering account IDs or mobile routes. Social identity providers can later attach to the same user.

## Asynchronous work

Dispatch ebook inspection/LCP packaging, audio encoding/HLS or protected package generation, large object copying, email/SMS notifications, and analytics through queued jobs. HTTP handlers validate, persist an intent, enqueue work, and return a resource or accepted state. Retryable jobs are idempotent by asset/version or event ID.

## Error and concurrency behavior

- `401` means the token is invalid or expired; `403` means the user lacks the requested entitlement or capability.
- A payment initialization does not mark an order paid. The client polls/refreshes the order resource after the provider redirect; only the verified webhook flow changes ownership.
- Progress batches carry a client event UUID, device UUID, client timestamp, and last known server version. Server acknowledgements make retries safe; conflict resolution is per publication and locator type.
- Rate-limit OTP, checkout initialization, license renewal, samples, and webhook endpoints separately.
