import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, Pill, PrimaryLink } from "@/components/ui";
import { assessment, courses, track } from "@/lib/mock-data";

const sourceLabel: Record<string, string> = {
  linkedin_learning: "LinkedIn Learning",
  internal: "OnRamp",
  other: "Other",
};

export default async function TrackPage({
  params,
}: {
  params: Promise<{ trackId: string }>;
}) {
  const { trackId } = await params;
  if (trackId !== track.id) notFound();

  const allComplete = courses.every((c) => c.completed);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/dashboard"
        className="text-sm text-muted-foreground underline decoration-dotted"
      >
        ← Back to dashboard
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        {track.title}
      </h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        {track.description}
      </p>

      <div className="mt-8 space-y-3">
        {courses.map((course) => (
          <Card key={course.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{course.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {sourceLabel[course.source]} ·{" "}
                {course.status === "mocked" ? "demo data" : "live"} ·{" "}
                {course.durationMinutes} min
              </p>
            </div>
            <Pill tone={course.completed ? "success" : "neutral"}>
              {course.completed ? "Completed" : "Not started"}
            </Pill>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <p className="font-medium">Ready to show what you&apos;ve learned?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {allComplete
            ? "You've completed the modules for this track. The next step is a short, real scenario — not a quiz."
            : "You can attempt the assessment once you feel ready; it's a real scenario, not a quiz."}
        </p>
        <div className="mt-4">
          <PrimaryLink href={`/assessment/${assessment.id}`}>
            Start assessment
          </PrimaryLink>
        </div>
      </Card>
    </div>
  );
}
