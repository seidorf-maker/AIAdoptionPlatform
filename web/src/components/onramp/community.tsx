"use client";

import { useState } from "react";
import { Card, Pill } from "@/components/ui";
import { Markdown } from "@/components/onramp/markdown";
import {
  INITIAL_COMMUNITY_POSTS,
  type CommunityPost,
  type CommunityAnswer,
} from "@/lib/onramp/community-posts";

const TRACKS: CommunityPost["track"][] = ["Finance", "Sales Operations", "Operations"];

function trackTone(track: CommunityPost["track"]): "accent" | "success" | "review" {
  if (track === "Finance") return "accent";
  if (track === "Sales Operations") return "review";
  return "success";
}

export function Community({
  name,
  roleLabel,
  mode,
}: {
  name: string;
  roleLabel: string;
  mode: "live" | "preview";
}) {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  // Preview mode opens the first post by default so a signed-out visitor
  // sees a filled-in example (prompt card, answers, accepted marker)
  // rather than an empty list — same idea as Prompt Coach's preview mode
  // pre-filling a sample task/response.
  const [openId, setOpenId] = useState<string | null>(
    mode === "preview" ? INITIAL_COMMUNITY_POSTS[0].id : null
  );
  const [composerOpen, setComposerOpen] = useState(false);

  function addPost(title: string, track: CommunityPost["track"], body: string, promptSnippet: string) {
    const id = `post-${Date.now()}`;
    setPosts((prev) => [
      {
        id,
        title,
        author: name,
        role: roleLabel,
        track,
        tags: [],
        votes: 0,
        body,
        promptSnippet: promptSnippet.trim() || undefined,
        answers: [],
      },
      ...prev,
    ]);
    setComposerOpen(false);
    setOpenId(id);
  }

  function addAnswer(postId: string, body: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              answers: [
                ...p.answers,
                {
                  id: `ans-${Date.now()}`,
                  author: name,
                  role: roleLabel,
                  body,
                },
              ],
            }
          : p
      )
    );
  }

  function upvote(postId: string) {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, votes: p.votes + 1 } : p))
    );
  }

  const openPost = posts.find((p) => p.id === openId) ?? null;

  if (openPost) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpenId(null)}
          className="mb-4 text-sm text-muted-foreground hover:text-accent"
        >
          ← Back to community
        </button>
        <PostDetail post={openPost} onUpvote={() => upvote(openPost.id)} onAnswer={(body) => addAnswer(openPost.id, body)} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <p className="max-w-md text-sm text-muted-foreground">
          Real prompts and agent instructions from people using AI in their
          actual jobs. Share what worked, ask what to try, solve it together —
          not just for fun, for the work.
        </p>
        <button
          type="button"
          onClick={() => setComposerOpen((v) => !v)}
          className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_0_1px_var(--accent),0_0_20px_-2px_var(--accent-glow)] active:brightness-95"
        >
          {composerOpen ? "Cancel" : "Share a prompt"}
        </button>
      </div>

      {composerOpen && (
        <PostComposer onSubmit={addPost} />
      )}

      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <button
            key={post.id}
            type="button"
            onClick={() => setOpenId(post.id)}
            className="block w-full text-left"
          >
            <Card className="transition hover:border-accent">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone={trackTone(post.track)}>{post.track}</Pill>
                  </div>
                  <h3 className="mt-2 font-serif text-lg">{post.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {post.author} · {post.role}
                  </p>
                </div>
                <div className="shrink-0 text-right text-xs text-muted-foreground">
                  <div className="font-medium text-foreground">{post.votes}</div>
                  <div>votes</div>
                  <div className="mt-2 font-medium text-foreground">
                    {post.answers.length}
                  </div>
                  <div>answers</div>
                </div>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}

function PostDetail({
  post,
  onUpvote,
  onAnswer,
}: {
  post: CommunityPost;
  onUpvote: () => void;
  onAnswer: (body: string) => void;
}) {
  const [draft, setDraft] = useState("");

  const bodyMarkdown = post.promptSnippet
    ? `${post.body}\n\n\`\`\`\n${post.promptSnippet}\n\`\`\``
    : post.body;

  return (
    <div>
      <Pill tone={trackTone(post.track)}>{post.track}</Pill>
      <h2 className="mt-3 font-serif text-2xl">{post.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {post.author} · {post.role}
      </p>

      <Card className="mt-4">
        <Markdown text={bodyMarkdown} />
        <div className="mt-3 flex items-center gap-3 border-t border-card-border pt-3">
          <button
            type="button"
            onClick={onUpvote}
            className="rounded-full border border-card-border px-3 py-1 text-xs text-muted-foreground hover:border-accent hover:text-accent"
          >
            ▲ {post.votes}
          </button>
        </div>
      </Card>

      <h3 className="mt-8 font-serif text-lg">
        {post.answers.length} {post.answers.length === 1 ? "answer" : "answers"}
      </h3>
      <div className="mt-3 space-y-3">
        {post.answers.map((answer) => (
          <AnswerCard key={answer.id} answer={answer} />
        ))}
      </div>

      <div className="mt-6">
        <label htmlFor="new-answer" className="text-sm font-medium">
          Add your answer
        </label>
        <textarea
          id="new-answer"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Share what worked for you, or ask a follow-up…"
          className="mt-1.5 w-full min-h-24 rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-accent"
        />
        <button
          type="button"
          disabled={!draft.trim()}
          onClick={() => {
            onAnswer(draft.trim());
            setDraft("");
          }}
          className="mt-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_0_1px_var(--accent),0_0_20px_-2px_var(--accent-glow)] active:brightness-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100 disabled:hover:shadow-none"
        >
          Post answer
        </button>
      </div>
    </div>
  );
}

function AnswerCard({ answer }: { answer: CommunityAnswer }) {
  return (
    <Card className={answer.accepted ? "border-2 border-success" : ""}>
      {answer.accepted && (
        <Pill tone="success">✓ Marked helpful</Pill>
      )}
      <p className={`text-sm ${answer.accepted ? "mt-2" : ""}`}>{answer.body}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        {answer.author} · {answer.role}
      </p>
    </Card>
  );
}

function PostComposer({
  onSubmit,
}: {
  onSubmit: (
    title: string,
    track: CommunityPost["track"],
    body: string,
    promptSnippet: string
  ) => void;
}) {
  const [title, setTitle] = useState("");
  const [track, setTrack] = useState<CommunityPost["track"]>("Finance");
  const [body, setBody] = useState("");
  const [promptSnippet, setPromptSnippet] = useState("");

  return (
    <Card className="mt-4">
      <div className="space-y-3">
        <div>
          <label htmlFor="post-title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. The prompt I use to draft a first-pass client email"
            className="mt-1.5 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-accent"
          />
        </div>
        <div>
          <label htmlFor="post-track" className="text-sm font-medium">
            Track
          </label>
          <select
            id="post-track"
            value={track}
            onChange={(e) => setTrack(e.target.value as CommunityPost["track"])}
            className="mt-1.5 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-accent"
          >
            {TRACKS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="post-body" className="text-sm font-medium">
            What worked (or what you're stuck on)
          </label>
          <textarea
            id="post-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Tell the story the way you'd tell a coworker…"
            className="mt-1.5 w-full min-h-24 rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-accent"
          />
        </div>
        <div>
          <label htmlFor="post-prompt" className="text-sm font-medium">
            Prompt or agent instructions (optional)
          </label>
          <textarea
            id="post-prompt"
            value={promptSnippet}
            onChange={(e) => setPromptSnippet(e.target.value)}
            placeholder="Paste the actual prompt so others can copy it…"
            className="mt-1.5 w-full min-h-20 rounded-lg border border-card-border bg-background px-3 py-2 font-mono text-xs outline-none focus-visible:border-accent"
          />
        </div>
        <button
          type="button"
          disabled={!title.trim() || !body.trim()}
          onClick={() => onSubmit(title.trim(), track, body.trim(), promptSnippet)}
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_0_1px_var(--accent),0_0_20px_-2px_var(--accent-glow)] active:brightness-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100 disabled:hover:shadow-none"
        >
          Post to community
        </button>
      </div>
    </Card>
  );
}
