import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { MoveList } from '../components/MoveList.jsx';

export function ReviewList() {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [isloading, setisloading] = useState(false);
  const [isend, setisend] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [cookies] = useCookies();

  useEffect(() => {
    if (count < 0) {
      setCount(0);
    } else {
      setisloading(true);
      axios
        .get(`https://api-for-missions-and-railways.herokuapp.com/books?offset=` + count, {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          setList(res.data);
          setisend(res.data.length != 10);
          console.log(res.data);
        })
        .catch((err) => {
          setErrorMessage(`一覧の取得に失敗しました。${err}`);
        })
        .finally(() => setisloading(false));
    }
  }, [count]);

  const listUp = list.map((list) => {
    return (
      <div className="container">
        <h2 className="title">{list.title}</h2>
      </div>
    );
  });

  return (
    <div>
      <h1>レビュー一覧</h1>
      <p className="error-message">{errorMessage}</p>
      <button className="newbtn">
        <Link to="/">レビュー登録</Link>
      </button>
      <MoveList isloading={isloading} isend={isend} count={count} setCount={setCount} />
      <div>{listUp}</div>
      <MoveList isloading={isloading} isend={isend} count={count} setCount={setCount} />
    </div>
  );
}
