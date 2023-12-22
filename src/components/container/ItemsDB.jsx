"use client";
import { useEffect, useState } from "react";
import { ButtonPage } from "../common/ButtonPage";
import { Select } from "../common/Select";
import Image from "next/image";
import { getItemsDB } from "@/utils/fetchData";
import { svgComponent } from "@/utils/svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const ItemsDB = ({ item, itemsNumb }) => {
  const [dataDB, setDataDB] = useState([]);
  const [pageNumb, setPageNumb] = useState(1);
  const [limitNumb, setLimitNumb] = useState(5);
  const pageMax = Math.ceil(itemsNumb / limitNumb);
  const [readMoreMap, setReadMoreMap] = useState({});
  const path = usePathname();

  const fetchData = async (pageNumb, limitNumb, item) => {
    setDataDB(await getItemsDB(pageNumb, limitNumb, item));
  };

  const pageNext = () => {
    const page = pageMax === pageNumb ? pageNumb : parseInt(pageNumb) + 1;
    setPageNumb(page);
  };

  const pagePrev = () => {
    const page = pageNumb === 1 ? pageNumb : pageNumb - 1;
    setPageNumb(page);
  };
  useEffect(() => {
    fetchData(pageNumb, limitNumb, item);
  }, [pageNumb, limitNumb, item]);

  return (
    <section className="flex flex-col gap-9 p-2 px-3">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 max-w-2xl flex-col xl:flex-row md:flex-row">
          <Select
            label="Selecciona un limite"
            onChange={(e) => setLimitNumb(e.target.value)}
            limitNumb={[5, 10, 15, 20]}
            htmlFor="limit "
          />
          <Select
            label="Selecciona una pagina"
            onChange={(e) => setPageNumb(e.target.value)}
            numbPage={pageMax}
            htmlFor="pages "
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-3  ">
        <p>Pagina: {pageNumb}</p>
        <div className="flex gap-1">
          <ButtonPage
            label="Anterior"
            onClick={pagePrev}
            svg={svgComponent[1].svg}
            leftSvg
          />
          <ButtonPage
            label="Siguiente"
            onClick={pageNext}
            svg={svgComponent[0].svg}
            disabled={pageNumb === pageMax}
            leftSvg={false}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {dataDB.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <p className="self-start">
              <span className="font-semibold">Id: </span>
              {item.id}
            </p>
            <p className="self-start">
              <span className="font-semibold">Nombre: </span>
              {item.name}
            </p>
            <p className="flex gap-2 flex-col self-start">
              <span className="font-semibold">Descripción:</span>
              <span>
                {readMoreMap[item.name + index]
                  ? item.description.slice(0, item.description.length)
                  : item.description.slice(
                      0,
                      item.description.length > 111
                        ? item.description.length / 7
                        : item.description.length / 2
                    )}

                <span
                  onClick={() =>
                    setReadMoreMap({
                      ...readMoreMap,
                      [item.name + index]: !readMoreMap[item.name + index],
                    })
                  }
                  className="cursor-pointer"
                >
                  {readMoreMap[item.name + index] ? (
                    <span className="text-blue-800"> Ver menos</span>
                  ) : (
                    <>
                      ... <span className="text-blue-800">Ver mas</span>
                    </>
                  )}
                </span>
              </span>
            </p>
            <Link
              href={`${path === "/" ? "/characters" : path}/${item.id}`}
              className="self-start flex gap-2"
            >
              {svgComponent[0].svg}
              <span className="text-blue-800">Ver mas</span>
            </Link>
            <div className="md:w-52 xl:w-52">
              <Image
                src={item.image}
                width={700}
                height={0}
                alt={item.name}
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-1 w-full justify-center">
        <ButtonPage
          label="Anterior"
          onClick={pagePrev}
          svg={svgComponent[1].svg}
          leftSvg
        />
        <ButtonPage
          label="Siguiente"
          onClick={pageNext}
          svg={svgComponent[0].svg}
          leftSvg={false}
        />
      </div>
    </section>
  );
};
