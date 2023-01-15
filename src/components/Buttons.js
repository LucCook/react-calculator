import { calculateFunc, deleteLeft } from "./utils";



export const Backspace = ({display}) => {
  return (
    <button id="backspace" onClick={() => {
        deleteLeft(display)
    }}>
      ⌫
    </button>
  );
};

export const Resolve = ({ innerRef, calculate }) => {
  return (
    <button ref={innerRef} id="resolve" onClick={() => {
        calculateFunc(calculate)
    }}>=</button>
  );
};


