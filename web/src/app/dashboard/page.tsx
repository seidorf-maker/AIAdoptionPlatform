import { Card, Pill, PrimaryLink } from "@/components/ui";
import { AuthGuard } from "@/components/auth-guard";
import {
  courses,
  integrationConnections,
  persona,
  track,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const completedCount = courses.filter((c) => c.completed).length;

  return (
    <AuthGuard>
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">
        {persona.jobTitle} · {persona.department} · {persona.orgName}
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">
        Welcome back, {persona.fullName.split(" ")[0]}
      </h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Here&apos;s your recommended path — chosen for your role, not pulled
        from a catalog you have to search through.
      </p>

      <Card className="mt-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Pill tone="accent">Your recommended track</Pill>
            <h2 className="mt-3 text-xl font-semibold">{track.title}</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {track.description}
            </p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            {completedCount} of {courses.length} modules complete
          </div>
        </div>
        <div className="mt-6">
          <PrimaryLink href={`/track/${track.id}`}>
            Continue track
          </PrimaryLink>
        </div>
      </Card>

      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <p className="font-medium">Connected accounts</p>
          <Pill tone="neutral">Demo data</Pill>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          In a live deployment this reflects your company&apos;s real
          LinkedIn Learning connection. This demo shows sample data.
        </p>
        <ul className="mt-4 space-y-2">
          {integrationConnections.map((c) => (
            <li
              key={c.provider}
              className="flex items-center justify-between rounded-lg border border-card-border bg-muted/60 px-4 py-2.5 text-sm"
            >
              <span>{c.provider}</span>
              <Pill tone={c.connected ? "success" : "neutral"}>
                {c.connected ? "Connected (demo)" : "Not connected"}
              </Pill>
            </li>
          ))}
        </ul>
      </Card>
    </div>
    </AuthGuard>
  );
}
