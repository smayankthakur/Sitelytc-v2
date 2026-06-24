import { notFound, redirect } from "next/navigation";
import { getCaseStudy } from "@/lib/work-data";

/** Each case study lives on its own sub-domain — redirect there. */
export default async function CaseStudyRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  redirect(study.href);
}
