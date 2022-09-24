import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/Pagenation.scss';

export function Pagenation(props) {
  const count = useSelector((state) => state.countReducer.count);
  const dispatch = useDispatch();
  const increment = () => {
    dispatch({ type: 'INCREASE_COUNT' });
  };
  const decrement = () => {
    dispatch({ type: 'DECREASE_COUNT' });
  };

  return (
    <div className="btnset">
      <button type="button" onClick={decrement} disabled={props.isloading || count <= 0}>
        前の10件
      </button>
      <p>{(count + 10) / 10}ページ目</p>
      <button type="button" onClick={increment} disabled={props.isloading || props.isend}>
        次の10件
      </button>
    </div>
  );
}
