import { logout } from "@/lib/actions";
import { SubmitButton } from "@/components/submit-button";

export function LogoutForm({ className }: { className?: string }) {
  return (
    <form action={logout}>
      <SubmitButton size="sm" className={className}>
        Sign Out
      </SubmitButton>
    </form>
  );
}
