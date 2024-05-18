"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const gotoLoginPage = () => {
    router.push("/login");
  };
  return (
    <main>
      <h1>Welcome to the Connexin Demo App!</h1>
      <p>
        Get started by reading&nbsp;
        <code>README.md</code>
      </p>

      <button className="btn btn-sm btn-primary" onClick={gotoLoginPage}>
        Login to continue
      </button>
    </main>
  );
}
