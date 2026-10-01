-- DropForeignKey
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_productId_fkey";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "images" JSONB;

-- Preserve active images before removing the relational table.
UPDATE "product" AS product
SET "images" = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', image."id",
      'url', image."url",
      'alt', image."alt",
      'position', image."position"
    )
    ORDER BY image."position", image."createdAt"
  )
  FROM "product_image" AS image
  WHERE image."productId" = product."id"
    AND image."deletedAt" IS NULL
)
WHERE EXISTS (
  SELECT 1
  FROM "product_image" AS image
  WHERE image."productId" = product."id"
    AND image."deletedAt" IS NULL
);

-- DropTable
DROP TABLE "product_image";
