import Script from "next/script";
import "./sc1001.css";

export default function Sc1001Layout({ children }: LayoutProps<"/sc1001">) {
  return (
    <>
      {children}
      {/* Puter.js: free AI marking, each viewer signs in with their own Puter account. */}
      <Script src="https://js.puter.com/v2/" strategy="lazyOnload" />
    </>
  );
}
