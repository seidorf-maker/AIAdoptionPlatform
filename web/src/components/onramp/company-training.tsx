"use client";

import { useState } from "react";
import { COMPANY_TRAINING, type CompanyCourse } from "@/lib/onramp/company-training";

// The "sits on top of your existing L&D" tab. Shows the training the company
// already owns, with a curated recommended set first (persona: permission
// before exploration — not a catalog to wade through). Library data is mocked
// for this demo; the live LinkedIn Learning / LMS sync is deferred.

export function CompanyTraining({
  mode = "live",
}: {
  mode?: "live" | "preview";
}) {
  const [planned, setPlanned] = useState<Set<string>>(new Set());

  function toggle(title: string) {
    if (mode !== "live") return;
    setPlanned((prev) => {
      const next = new Set(prev);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  }

  return (
    <div>
      <div className="rounded-2xl border border-card-border bg-card p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success-soft px-3 py-1 text-xs font-medium text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Connected to your company&apos;s learning systems
          </span>
          <span className="text-xs text-muted-foreground">· sample data for this demo</span>
        </div>

        <h2 className="mt-3 mb-1 text-lg font-semibold tracking-tight">
          You already have access to all of this
        </h2>
        <p className="text-sm text-muted-foreground">
          OnRamp doesn&apos;t replace the training your company already pays for
          — it points you to the exact parts that build the skills your
          certification proves. Everything below is already licensed to you and
          approved to explore.
        </p>

        <div className="mt-4 rounded-xl border border-success/25 bg-success-soft px-4 py-3 text-sm text-success">
          Most companies use only a fraction of the learning they already pay
          for. OnRamp turns that shelf into usage — routing each person to what
          actually matters for their role.
        </div>
      </div>

      {planned.size > 0 && (
        <div className="mt-4 rounded-xl border border-card-border bg-card px-4 py-3 text-sm">
          <strong>Your plan:</strong>{" "}
          {[...planned].map((title) => (
            <span
              key={title}
              className="mr-1.5 mt-1 inline-block rounded-full border border-success/30 bg-success-soft px-3 py-1 text-xs text-success"
            >
              {title}
            </span>
          ))}
        </div>
      )}

      {COMPANY_TRAINING.map((group) => (
        <section key={group.heading} className="mt-6">
          <h3 className="mb-1 text-sm font-semibold">{group.heading}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{group.blurb}</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
            {group.courses.map((course) => (
              <CourseCard
                key={course.title}
                course={course}
                highlight={group.recommended}
                planned={planned.has(course.title)}
                onToggle={() => toggle(course.title)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function CourseCard({
  course,
  highlight,
  planned,
  onToggle,
}: {
  course: CompanyCourse;
  highlight: boolean;
  planned: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`flex flex-col gap-1.5 rounded-xl border p-3.5 ${
        planned
          ? "border-success/40 bg-success-soft"
          : highlight
            ? "border-accent/30 bg-card"
            : "border-card-border bg-card"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-semibold">{course.title}</div>
        {course.tag && (
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
              course.tag === "Required"
                ? "border border-review/30 bg-review-soft text-review"
                : "border border-accent/30 bg-accent-soft text-accent"
            }`}
          >
            {course.tag}
          </span>
        )}
      </div>
      <div className="text-xs text-muted-foreground">
        {course.provider} · {course.duration} · {course.format}
      </div>
      {course.mapsTo && (
        <div className="text-xs text-accent">↳ {course.mapsTo}</div>
      )}
      <div className="mt-auto flex items-center gap-2 pt-2">
        <button
          type="button"
          onClick={onToggle}
          className={`ml-auto rounded-md border px-2.5 py-1 text-xs transition-all duration-200 ${
            planned
              ? "border-success bg-success text-success-foreground"
              : "border-card-border bg-background text-muted-foreground hover:border-accent hover:text-accent hover:shadow-[0_0_12px_-4px_var(--accent-glow)]"
          }`}
        >
          {planned ? "Added ✓" : "+ Add to plan"}
        </button>
      </div>
    </div>
  );
}
