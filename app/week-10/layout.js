import { AuthContextProvider } from "./_utils/auth-context";
export const metadata = { title: "Week 9" };
export default function Layout({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
