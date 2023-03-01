import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Tree from "@/components/Tree/Tree";
import { NodeProvider } from "@/context/nodeContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Build trees" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NodeProvider>
        <main className={styles.main}>
          <Tree />
        </main>
      </NodeProvider>
    </>
  );
}
