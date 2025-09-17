import { Icons, type IconKeys } from "../assets/icon";

const Icon = ({
  name,
  className = "",
}: {
  name: IconKeys;
  className: string;
}) => {
  const iconContent = Icons[name];
  if (typeof iconContent === "string") {
    let svgContent = decodeURIComponent(
      iconContent.replace("data:image/svg+xml,", "")
    );

    if (className) {
      svgContent = svgContent.replace(
        /<svg([^>]*)>/,
        `<svg$1 class="${className}">`
      );
    }
    return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
  } else {
    return <>{iconContent}</>;
  }
};

export default Icon;
