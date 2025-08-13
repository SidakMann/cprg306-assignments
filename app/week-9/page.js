"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserAuth } from "./_utils/auth-context";

export default function Week9Home() {
  const router = useRouter();
  const { user, gitHubSignIn, firebaseSignOut, loadingInitial } = useUserAuth();

  if (loadingInitial) return <p style={{padding:16}}>Loading…</p>;

  const login = async () => {
    try { await gitHubSignIn(); router.push("/week-9/shopping-list"); }
    catch (e) { console.error(e); alert("GitHub login failed"); }
  };

  const logout = async () => { try { await firebaseSignOut(); } catch (e) { alert("Logout failed"); } };

  return (
    <main style={{ padding: 24, maxWidth: 640, margin: "0 auto" }}>
      <h1>Week 9 — Login</h1>
      {!user ? (
        <>
          <p>Sign in to access your Shopping List.</p>
          <button onClick={login} style={{padding:"10px 16px", borderRadius:8, border:"1px solid #ddd"}}>Continue with GitHub</button>
        </>
      ) : (
        <>
          <p>Welcome, <b>{user.displayName || user.email || "User"}</b></p>
          <div style={{ display:"flex", gap:12 }}>
            <Link href="/week-9/shopping-list" style={{padding:"10px 16px", borderRadius:8, border:"1px solid #ddd"}}>Go to Shopping List</Link>
            <button onClick={logout} style={{padding:"10px 16px", borderRadius:8, border:"1px solid #ddd"}}>Logout</button>
          </div>
        </>
      )}
    </main>
  );
}
