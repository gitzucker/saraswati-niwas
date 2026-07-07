import { getProperties, getPropertyBySlug } from "../../lib/cms";
import PropertyDetailsClient from "./PropertyDetailsClient";
import { redirect } from "next/navigation";

// Force Next.js to pre-render these pages statically at build time
export const dynamic = "force-static";

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({
    slug: p.slug,
  }));
}

export default async function PropertyPage({ params }) {
  const resolvedParams = await params;
  const property = await getPropertyBySlug(resolvedParams.slug);

  if (!property) {
    redirect("/hostels");
  }

  return <PropertyDetailsClient property={property} />;
}
