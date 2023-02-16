import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Tree from "@/components/Tree/Tree";
import { NodeProvider } from "@/testdata";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById("tutorial");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(30, 30, 50, 50);
  }, []);

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
      <canvas id="tutorial" width="150" height="150">
        current stock price: $3.15 + 0.15
      </canvas>
    </>
  );
}
