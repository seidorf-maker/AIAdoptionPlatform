"use client";

import { useState } from "react";
import { Card, Pill } from "@/components/ui";
import {
  BUSINESS_UNIT_STANDINGS,
  OTHER_OPTED_IN,
  type OptedInIndividual,
} from "@/lib/onramp/leaderboard-data";

// Demo-only mock standing for the signed-in user, used only if they opt in
// below. Deliberately modest/positive — see the file header in
// leaderboard-data.ts for why this view can never show a failure state.
const YOUR_MOCK_STANDING = { points: 120, certificationsEarned: 1, streakWeeks: 2 };

export function Leaderboard({
  name,
  roleLabel,
  mode,
}: {
  name: string;
  roleLabel: string;
  mode: "live" | "preview";
}) {
  // Preview mode defaults to opted-in so a signed-out visitor immediately
  // sees what the individual leaderboard looks like with data, rather than
  // the empty off-state — same idea as Community defaulting to an open post.
  const [optedIn, setOptedIn] = useState(mode === "preview");

  const roster: OptedInIndividual[] = optedIn
    ? [
        ...OTHER_OPTED_IN,
        { name, role: roleLabel, ...YOUR_MOCK_STANDING },
      ].sort((a, b) => b.points - a.points)
    : OTHER_OPTED_IN.slice().sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="font-serif text-xl">Business Unit Leaderboard</h2>
          <Pill tone="neutral">What leadership sees</Pill>
        </div>
        <p className="mt-1 max-w-lg text-sm text-muted-foreground">
          Always aggregate, always by team — no individual employee is ever
          named here. This is the leadership-tracking view included with the
          Team Leaderboards add-on.
        </p>

        <Card className="mt-4">
          <div className="space-y-4">
            {BUSINESS_UNIT_STANDINGS.map((unit, i) => (
              <div key={unit.unit}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium">
                    {i === 0 && "🏆 "}
                    {unit.unit}
                  </span>
                  <span className="text-muted-foreground">
                    {unit.completionRate}% completion · {unit.certificationsEarned} certifications ·{" "}
                    {unit.participants} enrolled
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${unit.completionRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h2 className="font-serif text-xl">Your Leaderboard Standing</h2>
          <Pill tone="review">Opt-in, off by default</Pill>
        </div>
        <p className="mt-1 max-w-lg text-sm text-muted-foreground">
          Joining is always your choice. If you opt in, only your positive
          achievements — points, certifications, streaks — are ever shown.
          Nothing about a low score or an assessment you didn&apos;t pass is
          ever shown here, opted in or not.
        </p>

        <Card className="mt-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">
                {optedIn
                  ? "You're on the leaderboard."
                  : "You're not on the leaderboard."}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {optedIn
                  ? "Your certifications, points, and streak are visible to colleagues who also opted in."
                  : "No one can see your standing unless you turn this on."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOptedIn((v) => !v)}
              role="switch"
              aria-checked={optedIn}
              className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                optedIn ? "bg-accent" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-card shadow transition ${
                  optedIn ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="mt-5 space-y-2 border-t border-card-border pt-4">
            {roster.map((person, i) => {
              const isYou = person.name === name;
              return (
                <div
                  key={person.name}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                    isYou ? "bg-accent-soft" : ""
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 text-xs text-muted-foreground">
                      #{i + 1}
                    </span>
                    <span className="font-medium">
                      {person.name} {isYou && "(you)"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {person.role}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {person.points} pts · {person.certificationsEarned}{" "}
                    {person.certificationsEarned === 1 ? "cert" : "certs"} ·{" "}
                    {person.streakWeeks}wk streak
                  </span>
                </div>
              );
            })}
            {!optedIn && (
              <p className="pt-1 text-center text-xs text-muted-foreground">
                Turn on the toggle above to see where you&apos;d land.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
