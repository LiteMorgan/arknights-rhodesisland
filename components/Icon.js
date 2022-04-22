const Icon = ({ children, className: classNameProp, fill, name }) => {
  const viewBox = {
    "ui-rank": "0 0 18 18",
  };

  return (
    <svg
      className={["block w-full h-full", classNameProp].join(" ")}
      fill={fill}
      viewBox={viewBox[name] ? viewBox[name] : "0 0 256 256"}
    >
      {children ? (
        children
      ) : (
        <use
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xlinkHref={`#${name}`}
          href={`#${name}`}
          role="presentation"
        />
      )}
    </svg>
  );
};

export default Icon;
