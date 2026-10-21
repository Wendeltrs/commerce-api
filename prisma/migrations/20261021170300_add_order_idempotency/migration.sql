CREATE TABLE "idempotency_key" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "requestHash" VARCHAR(64) NOT NULL,
    "orderId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "idempotency_key_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "idempotency_key_orderId_key" ON "idempotency_key"("orderId");
CREATE UNIQUE INDEX "idempotency_key_userId_key_key" ON "idempotency_key"("userId", "key");

ALTER TABLE "idempotency_key"
ADD CONSTRAINT "idempotency_key_orderId_fkey"
FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "payment" ADD COLUMN "checkoutUrl" VARCHAR(2048);
