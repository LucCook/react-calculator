import "../fonts/display.ttf";

export const Display = ({ displayText }) => {
  return (
    <div id="display">
      <p id="displayContent">
        {displayText.filter((item) => item !== "=").join("")}
      </p>
    </div>
  );
};
