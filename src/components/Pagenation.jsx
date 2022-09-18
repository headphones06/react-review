import React from 'react';
import '../styles/Pagenation.scss';

export function Pagenation(props) {
  const increment = () => props.setCount((prevValue) => prevValue + 10);
  const decrement = () => props.setCount((prevValue) => prevValue - 10);

  return (
    <div className="btnset">
      <button type="button" onClick={decrement} disabled={props.isloading || props.count <= 0}>
        前の10件
      </button>
      <button type="button" onClick={increment} disabled={props.isloading || props.isend}>
        次の10件
      </button>
    </div>
  );
}
