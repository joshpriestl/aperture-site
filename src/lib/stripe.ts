import { createHmac, timingSafeEqual } from "crypto";

const STRIPE_API_VERSION = "2025-04-30.basil";
const STRIPE_CHECKOUT_URL = "https://api.stripe.com/v1/checkout/sessions";

type CheckoutSessionParams = {
  assessmentId: string;
  baseUrl: string;
  customerEmail: string | null;
};

type StripeCheckoutSession = {
  id: string;
  url: string | null;
};

export type StripeCheckoutCompletedEvent = {
  id: string;
  type: "checkout.session.completed";
  data: {
    object: {
      id: string;
      client_reference_id: string | null;
      customer_email?: string | null;
      customer_details?: {
        email?: string | null;
      } | null;
      metadata?: {
        assessment_id?: string;
        organisation_id?: string;
        person_id?: string;
      } | null;
      payment_intent?: string | null;
      payment_status?: string | null;
    };
  };
};

export function getStripeConfig() {
  return {
    priceId: process.env.STRIPE_PRICE_ID,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  };
}

export async function createStripeCheckoutSession({
  assessmentId,
  baseUrl,
  customerEmail,
}: CheckoutSessionParams): Promise<StripeCheckoutSession> {
  const { priceId, secretKey } = getStripeConfig();

  if (!priceId || !secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY or STRIPE_PRICE_ID");
  }

  // {CHECKOUT_SESSION_ID} must NOT be URL-encoded — concatenate it directly
  // so Stripe can substitute the real session ID on redirect.
  const successUrl =
    new URL("/blueprint/success", baseUrl).toString() +
    "?session_id={CHECKOUT_SESSION_ID}";

  const cancelUrl = new URL("/blueprint/checkout", baseUrl);
  cancelUrl.searchParams.set("assessment_id", assessmentId);

  const body = new URLSearchParams({
    mode: "payment",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    client_reference_id: assessmentId,
    success_url: successUrl.toString(),
    cancel_url: cancelUrl.toString(),
    "metadata[assessment_id]": assessmentId,
  });

  if (customerEmail) {
    body.set("customer_email", customerEmail);
  }

  const response = await fetch(STRIPE_CHECKOUT_URL, {
    body,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": STRIPE_API_VERSION,
    },
    method: "POST",
  });

  const payload = await response.json();

  if (!response.ok) {
    const message =
      typeof payload?.error?.message === "string"
        ? payload.error.message
        : "Stripe checkout session could not be created";
    throw new Error(message);
  }

  return payload as StripeCheckoutSession;
}

export function verifyStripeWebhook(
  body: string,
  signatureHeader: string | null,
): StripeCheckoutCompletedEvent {
  const { webhookSecret } = getStripeConfig();

  if (!webhookSecret || !signatureHeader) {
    throw new Error("Missing Stripe webhook secret or signature");
  }

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((part) => {
      const [key, value] = part.split("=");
      return [key, value];
    }),
  );

  const timestamp = parts.t;
  const signature = parts.v1;

  if (!timestamp || !signature) {
    throw new Error("Invalid Stripe signature header");
  }

  const expected = createHmac("sha256", webhookSecret)
    .update(`${timestamp}.${body}`, "utf8")
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "hex");
  const actualBuffer = Buffer.from(signature, "hex");

  if (
    expectedBuffer.length !== actualBuffer.length ||
    !timingSafeEqual(expectedBuffer, actualBuffer)
  ) {
    throw new Error("Invalid Stripe webhook signature");
  }

  return JSON.parse(body) as StripeCheckoutCompletedEvent;
}
