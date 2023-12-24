"use client";

import { svgComponent } from "../utils/svg";
import Link from "next/link";
import { ItemsDB } from "@/components/container/ItemsDB";
import { InputSearch } from "@/components/common/InputSearch";

export default function Home() {
  return (
    <main className="flex flex-col p-2 px-3 gap-3">
      <section className="flex flex-col gap-3">
        <h1 className="xl:text-3xl md:text-lg text-base ">
          Dragon Ball Personajes
        </h1>
        <Link href="/planets" className=" flex gap-1 w-28">
          {svgComponent[0].svg} <span className="text-blue-800">Planetas</span>
        </Link>
      </section>
      <div className="md:self-end">
        <InputSearch item={"characters"} numbItem={58}/>
      </div>
      <ItemsDB itemsNumb={58} item={"characters"} />
    </main>
  );
}
