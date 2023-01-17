import Head from "next/head";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { CV } from "../components/cv";
import { useIsDesktop } from "../hooks/isDesktop";

export default function Home() {
  const { isDesktop } = useIsDesktop();

  return (
    <div className="margin-off container">
      <Head>
        <title>Matt Gross</title>
        <meta name="description" content="Matt Gross personal site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isDesktop ? (
        <>
          <aside className="margin-off animated-bg">
            <Header />
            <Footer />
          </aside>

          <main>
            <CV />
          </main>
        </>
      ) : (
        <>
          <Header />

          <main>
            <CV />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}
