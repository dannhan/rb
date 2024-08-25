export default function Layout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") {
    return <h1>Hello World</h1>;
  }

  return <>{children}</>;
}
