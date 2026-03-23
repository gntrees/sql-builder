import { A } from "@solidjs/router";
import { createSignal } from "solid-js";

export function Home() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <nav>
        <A href="/">Home</A> | <A href="/about">About</A> |{" "}
        <A href="/contact">Contact</A>
      </nav>
      <section>
        <h1>Beranda</h1>
        <p>Ini dirender saat build-time.</p>
        <button type="button" onClick={() => setCount(count() + 1)}>
          Klik saya: {count()}
        </button>
      </section>
    </>
  );
}