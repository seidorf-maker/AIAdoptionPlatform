import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "./app-shell";

// proxy.ts already redirects signed-out visitors to /login before this
// renders; the check here is a defense-in-depth backstop (Proxy is an
// optimistic check per Next.js's own guidance, not a substitute for
// verifying inside the route itself).
export default async function AppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const metadata = user.user_metadata as {
    full_name?: string;
    role?: string;
    typed_email?: string;
  };

  return (
    <AppShell
      fullName={metadata.full_name ?? "there"}
      roleLabel={metadata.role ?? "Employee"}
      typedEmail={metadata.typed_email ?? null}
    />
  );
}
