import { logout } from "@/lib/actions";

import { LogoutButton } from "@/components/logout-button";

export function LogoutForm() {
  return (
    <form action={logout}>
      <LogoutButton />
    </form>
  );
}
