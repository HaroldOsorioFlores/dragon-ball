"use client";
import { getItemByID } from "@/utils/fetchData";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ButtonPage } from "@/components/common/ButtonPage";
import { svgComponent } from "@/utils/svg";
import Link from "next/link";
const Character = ({ params }) => {
  const id = parseInt(params.id);
  const [dataID, setDataID] = useState([]);
  const [readMore, setReadMore] = useState({
    description: false,
    originPlanet: false,
  });
  const router = useRouter();
  const arrayID = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 37, 38, 39, 40, 42,
    43, 44, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
  ];

  const fetchDataByID = async (id) => {
    return setDataID(await getItemByID("characters", id));
  };

  const findNextID = (currentID) => {
    const currentIndex = arrayID.indexOf(currentID);

    if (currentIndex !== -1 && currentIndex < arrayID.length - 1) {
      return arrayID[currentIndex + 1];
    }
    return null;
  };

  const findPrevID = (currentID) => {
    const currentIndex = arrayID.indexOf(currentID);

    if (currentIndex !== -1 && currentIndex > 0) {
      return arrayID[currentIndex - 1];
    }
    return null;
  };

  const buttonNext = async () => {
    const nextID = findNextID(id);
    if (nextID !== null) {
      router.push(`/characters/${nextID}`);
    }
  };
  const buttonPrev = async () => {
    const nextID = findPrevID(id);
    if (nextID !== null) {
      router.push(`/characters/${nextID}`);
    }
  };

  useEffect(() => {
    fetchDataByID(id);
  }, [id]);

  return (
    <main className="px-3 flex flex-col gap-4 pt-3 items-center ">
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
              onClick={buttonPrev}
            />
            <ButtonPage
              label={"Siguiente"}
              leftSvg={false}
              svg={svgComponent[0].svg}
              onClick={buttonNext}
            />
          </div>
        </section>
        {dataID && (
          <section className="flex flex-col gap-3">
            <h1>{dataID.name}</h1>
            <p>Afiliacion: {dataID.affiliation}</p>
            <p>
              Descripcion:
              {readMore.description
                ? dataID.description
                : dataID.description?.slice(0, dataID.description?.length / 2)}
              <span
                onClick={() =>
                  setReadMore({
                    ...readMore,
                    description: !readMore.description,
                  })
                }
              >
                {readMore.description ? (
                  <span className="text-blue-800 cursor-pointer">
                    {" "}
                    Ver menos
                  </span>
                ) : (
                  <span>
                    ...{" "}
                    <span className="text-blue-800 cursor-pointer">
                      Ver mas
                    </span>
                  </span>
                )}
              </span>
            </p>
            <p>Genero: {dataID.gender}</p>
            <p>Ki: {dataID.ki}</p>
            <p>Ki maximo: {dataID.maxKi}</p>
            <p>Raza: {dataID.race}</p>
            {dataID.image && (
              <div className="xl:w-96 md:w-72 w-60 self-center">
                <Image
                  src={dataID.image}
                  alt={`Personaje ${dataID.name}`}
                  width={500}
                  priority
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}
          </section>
        )}
        {dataID?.originPlanet && (
          <section className="flex flex-col gap-3">
            <p>Planeta: {dataID.originPlanet.name}</p>
            <p>Destruido: {dataID.originPlanet.isDestroyed ? "Si" : "No"}</p>
            <p>
              Descripcion:
              {readMore.originPlanet
                ? dataID.originPlanet.description
                : dataID.originPlanet.description.slice(
                    0,
                    dataID.originPlanet.description.length / 2
                  )}
              <span
                onClick={() =>
                  setReadMore({
                    ...readMore,
                    originPlanet: !readMore.originPlanet,
                  })
                }
              >
                {readMore.originPlanet ? (
                  <span className="text-blue-800 cursor-pointer">
                    {" "}
                    Ver menos
                  </span>
                ) : (
                  <span>
                    ...{" "}
                    <span className="text-blue-800 cursor-pointer">
                      Ver mas
                    </span>
                  </span>
                )}
              </span>
            </p>
            <div className="max-w-3xl self-center">
              <Image
                src={dataID.originPlanet.image}
                alt={`Planeta ${dataID.originPlanet.name}`}
                width={500}
                priority
                height={0}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </section>
        )}
        {dataID?.transformations && (
          <section className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {dataID.transformations.map((item, index) => (
              <div key={index}>
                <p>Fase: {item.name}</p>
                <p>Ki: {item.ki}</p>
                <div className="md:w-52 xl:w-52 ">
                  <Image
                    src={item.image}
                    alt={`Personaje ${item.name}`}
                    width={500}
                    priority
                    height={0}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            ))}
          </section>
        )}
      </section>
    </main>
  );
};

export default Character;
