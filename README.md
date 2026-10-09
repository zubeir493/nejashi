# Nejashi

Nejashi Digital Books is a mobile-first library for ebooks and audiobooks. A Work has Editions, and each format is a separate Publication. Commerce sells Products; verified payments issue Entitlements.

## Repository

```text
apps/
  api/       Laravel modular monolith, PostgreSQL, Redis/Horizon, Filament
  mobile/    React Native 0.84, TypeScript, iOS + Android
docs/        architecture, API, design, security, and delivery decisions
```

The API is registered locally with lerd as `sahifa-api.test`. Its `.lerd.yaml` declares PostgreSQL and Redis. The React Native Community CLI app has native platform folders for the Readium Swift and Kotlin integrations.

## Local development

The backend scaffold and initial migrations are installed in the lerd PHP 8.5 container. After a fresh checkout:

```sh
cd apps/api
lerd db:set postgres
lerd env:setup
lerd setup
```

Start Redis and the Laravel Horizon worker for this site as needed. The admin panel is at `http://sahifa-api.test/admin` after an administrator account has been provisioned.

For the mobile app, use Node 22.11 or newer and npm (`package-lock.json` is authoritative):

```sh
cd apps/mobile
npm ci
npx react-native start
```

In another terminal, run `npm run android` or `npm run ios`. iOS builds require macOS and Xcode. Never put Chapa secrets, S3 credentials, or DRM secrets in the app.

## Product decisions

- [Architecture and initial domain model](docs/ARCHITECTURE.md)
- [API conventions](docs/API.md)
- [Mobile design system](docs/DESIGN_SYSTEM.md)
- [Mobile screen map](docs/SCREEN_MAP.md)
- [Protected media and offline access](docs/SECURE_MEDIA.md)
- [Payments and referrals](docs/PAYMENTS.md)
- [Phased implementation plan](docs/IMPLEMENTATION_PLAN.md)

The mobile app includes an interactive screen scaffold for discovery, search, format-specific details, checkout, library, downloads, reading, listening, referrals, and account support. Chapa, API data, Readium, and protected-media delivery remain integration work described by the phased plan.
