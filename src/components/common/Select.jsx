export const Select = ({ label, htmlFor, onChange, numbPage, limitNumb }) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block  text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <select
        id={htmlFor}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {numbPage
          ? [...Array(numbPage)].map((item, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))
          : limitNumb.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
      </select>
    </>
  );
};
