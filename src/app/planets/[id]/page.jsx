"use client";
import { getItemByID } from "@/utils/fetchData";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonPage } from "@/components/common/ButtonPage";
import { svgComponent } from "@/utils/svg";
import { useRouter } from "next/navigation";

const Planet = ({ params }) => {
  const id = parseInt(params.id);
  const [dataId, setDataId] = useState([]);
  const router = useRouter();
  const [readMore, setReadMore] = useState({
    planet: false,
  });
  const arrayPlanet = [
    1, 2, 3, 4, 5, 6, 7, 11, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25,
  ];

  const nextId = (idIndex) => {
    return arrayPlanet.reduce((acc, item, index, arr) => {
      if (item === idIndex) {
        const nextValue = arr[index + 1] !== undefined ? arr[index + 1] : item;
        return nextValue;
      }
      return acc;
    }, undefined);
  };

  const prevId = (idIndex) => {
    return arrayPlanet.reduce((acc, item, index, arr) => {
      if (item === idIndex) {
        const nextValue = arr[index - 1] !== undefined ? arr[index - 1] : item;
        return nextValue;
      }
      return acc;
    }, undefined);
  };

  const fetchData = async (id) => {
    return setDataId(await getItemByID("planets", id));
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  return (
    <main className="px-3 flex flex-col  pt-3 items-center ">
      <section className="flex flex-col gap-4 xl:max-w-7xl md:max-w-4xl max-w-xl">
        <section className="flex flex-wrap items-center gap-3 justify-between">
          <Link href={"/"} className=" flex gap-2">
            {svgComponent[0].svg}
            <span className="text-blue-800">Inicio</span>
          </Link>
          <div className="flex">
            <ButtonPage
              label={"Anterior"}
              svg={svgComponent[1].svg}
              leftSvg
              onClick={() => router.push(`/planets/${prevId(id)}`)}
            />
            <ButtonPage
              label={"Siguiente"}
              leftSvg={false}
              svg={svgComponent[0].svg}
              onClick={() => router.push(`/planets/${nextId(id)}`)}
            />
          </div>
        </section>
        {dataId && (
          <>
            <section className="flex flex-col gap-3">
              <p>Planeta {dataId.name}</p>
              <p>Destruido: {dataId.isDestroyed ? "Si" : "No"}</p>
              <p>
                Descripcion:
                {readMore.planet
                  ? dataId.description?.slice(0, dataId.description.length)
                  : dataId.description?.slice(0, dataId.description.length / 2)}
                <span
                  onClick={() =>
                    setReadMore({
                      ...readMore,
                      planet: !readMore.planet,
                    })
                  }
                  className="cursor-pointer"
                >
                  {readMore.planet ? (
                    <span className="text-blue-600"> Ver menos</span>
                  ) : (
                    <>
                      ... <span className="text-blue-600">Ver mas</span>
                    </>
                  )}
                </span>
              </p>
              {dataId.image && (
                <div className="xl:max-w-7xl md:max-w-3xl ">
                  <Image
                    src={dataId.image}
                    width={500}
                    height={0}
                    alt={dataId.name}
                    style={{ height: "auto", width: "100%" }}
                    priority
                  />
                </div>
              )}
            </section>
            <section className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3">
              {dataId.characters?.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <p>Nombre: {item.name}</p>
                  <p>Ki: {item.ki}</p>
                  <p>Ki maximo: {item.maxKi}</p>
                  <p>Raza: {item.race}</p>
                  <p>Genero: {item.gender}</p>
                  <p>
                    Descripcion:{" "}
                    {readMore[item.id]
                      ? item.description
                      : item.description.slice(0, item.description.length / 4)}
                    <span
                      onClick={() =>
                        setReadMore({
                          ...readMore,
                          [item.id]: !readMore[item.id],
                        })
                      }
                    >
                      {readMore[item.id] ? (
                        <span className="text-blue-600"> Ver menos</span>
                      ) : (
                        <>
                          ... <span className="text-blue-600">Ver mas</span>
                        </>
                      )}
                    </span>
                  </p>
                  <div className="md:w-52 xl:w-52 self-center">
                    <Image
                      alt={item.name}
                      src={item.image}
                      width={500}
                      height={0}
                      style={{ height: "auto", width: "100%" }}
                      priority
                    />
                  </div>
                </div>
              ))}
            </section>
          </>
        )}
      </section>
    </main>
  );
};
export default Planet;
