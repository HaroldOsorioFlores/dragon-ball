import { InputSearch } from "@/components/common/InputSearch";
import { ItemsDB } from "@/components/container/ItemsDB";
import { svgComponent } from "@/utils/svg";
import Link from "next/link";

const Planets = () => {
  return (
    <main className="flex flex-col p-2 px-3 gap-3">
      <section className="flex flex-col gap-3">
        <h1 className="xl:text-3xl md:text-lg text-base ">Planetas</h1>
        <Link href="/" className=" flex gap-1">
          {svgComponent[0].svg}{" "}
          <span className="text-blue-800">Personajes</span>
        </Link>
      </section>
      <div className="md:self-end">
        <InputSearch item={"planets"} numbItem={20} />
      </div>
      <ItemsDB itemsNumb={20} item="planets" />
    </main>
  );
};

export default Planets;
