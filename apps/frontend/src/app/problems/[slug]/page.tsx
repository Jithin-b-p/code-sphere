
import ProblemClient from "./ProblemClient";
export default async function ProblemPage({ params }: { params: Promise<{slug: string}> }) {
  const {slug} = await params;

  return <ProblemClient slug = {slug} />
}
