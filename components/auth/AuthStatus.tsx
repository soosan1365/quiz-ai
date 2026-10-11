
import { auth } from "@/auth";
import AuthButton from "./AuthButton";

export default async function AuthStatus() {
  const session = await auth();

  return (
    <AuthButton
      isLoggedIn={Boolean(session?.user)}
      userName={session?.user?.name}
    />
  );
}
