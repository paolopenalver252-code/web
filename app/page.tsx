import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { ValueLadder } from "@/components/sections/value-ladder";
import { Process } from "@/components/sections/process";
import { Results } from "@/components/sections/results";
import { Trust } from "@/components/sections/trust";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <ValueLadder />
      <Process />
      <Results />
      <Trust />
      <FinalCta />
    </>
  );
}
