# Payments and referrals

## Chapa checkout

Keep Chapa behind a Laravel `PaymentGateway` interface. V1 creates a pending order and payment attempt, snapshots the selected product price in ETB minor units, and requests a hosted Chapa checkout URL from the backend. Open that URL in the platform's secure browser session and return to the app with a deep link. Chapa Inline is JavaScript for web pages; it does not belong in the React Native bundle. The redirect is a navigation hint only.

The mobile app contains no Chapa secret. Laravel initializes checkout with a random, unique `tx_ref`, expected amount/currency, server-controlled callback/return URLs, and the customer's allowed display details. Save the provider reference before redirecting. A user-facing “success” screen may say payment is being confirmed until the order endpoint reports `paid`.

For a webhook:

1. Validate the documented Chapa signature header against the configured server-side webhook secret using the raw request body where required.
2. Record/deduplicate the provider event and locate the payment by the unique `tx_ref`.
3. Call Chapa's transaction verification endpoint from Laravel. Compare provider status, `tx_ref`, expected amount, currency, and merchant mode.
4. In one database transaction with row locks, mark the payment verified and order paid once, then issue entitlements from the order-line publication snapshot and compute any referral commission.
5. Return success for already-processed valid events. Invalid, mismatched, or unverified events grant no access.

The same payment/entitlement path works if Chapa later gains a native direct-charge adapter. Refunds and chargebacks append payment events and reverse or suspend grants with an audit trail; they do not erase history.

## Referral attribution

Creator links, promo codes, and deep links resolve server-side to a campaign and attribution record. The app passes an opaque referral token through sign-in and checkout; the API resolves campaign eligibility and persists attribution against the account/order. Attribution rules include campaign window, new-customer condition, eligible publication/format, discount/commission rates, attribution window, maximum discount, and campaign budget.

The order snapshots the discount and attributed creator before payment. A `commission` is created only after Chapa verification, keyed uniquely to the paid order. Repeated webhook delivery cannot duplicate it. Commission states begin pending and can later be approved, reversed, or paid; discount does not depend on the app trusting a promo calculation.
