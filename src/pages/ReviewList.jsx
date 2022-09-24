import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Pagenation } from '../components/Pagenation.jsx';
import '../styles/ReviewList.scss';

export function ReviewList() {
  const count = useSelector((state) => state.countReducer.count);
  const [list, setList] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [isend, setisend] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [cookies] = useCookies();

  useEffect(() => {
    if (count < 0) {
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
      <div className="review__list" key={list.id}>
        <Link to="/" className="review__list--link">
          <h2 className="review__list--title">{list.title}</h2>
          <p className="review__list--user">投稿者:{list.reviewer}</p>
          <p className="review__list--detail">{list.review}</p>
        </Link>
      </div>
    );
  });

  return (
    <div className="review">
      <h1 className="review__title">レビュー一覧</h1>
      <p className="review__error">{errorMessage}</p>
      <button className="review__newbtn">
        <Link to="/">レビュー登録</Link>
      </button>
      <Pagenation isloading={isloading} isend={isend} />
      <div>{listUp}</div>
      <Pagenation isloading={isloading} isend={isend} />
    </div>
  );
}
