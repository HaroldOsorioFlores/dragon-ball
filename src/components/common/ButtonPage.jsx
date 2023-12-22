import { svgComponent } from "@/utils/svg";

export const ButtonPage = ({ label, onClick, svg, leftSvg }) => {
  return (
    <button
      type="button"
      className="bg-gray-800 text-white rounded-md py-2 border-l border-gray-200 hover:bg-amber-400 hover:text-white px-3"
      onClick={onClick}
    >
      <div className="flex ">
        {leftSvg ? svg : null}
        <span className="mr-2">{label}</span>
        {leftSvg === false ? svg : null}
      </div>
    </button>
  );
};
