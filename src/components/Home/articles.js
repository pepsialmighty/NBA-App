import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_BLOCKS } from '../utils/paths';
import { Link } from 'react-router-dom';

const HomeArticles = () => {
  let [articles, setAritcles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(
        `${URL_BLOCKS}?_limit=6&_sort=id&_order=desc`,
      );
      setAritcles(response.data);
    };
    fetchArticles();
  }, []);

  const showArticleBlocks = () => {
    //khai báo số hàng, mỗi hàng có 3 articles, dùng spread để quết các array lên với nhau
    const rows = [...Array(Math.ceil(articles.length / 3))];

    //trong 1 hàng sẽ có 3 thằng
    const articlesRow = rows.map((row, i) => articles.slice(i * 3, i * 3 + 3));

    //lấy nội dung của mấy thằng
    const generatedArticles = articlesRow.map((row, i) => (
      <div className='row' key={i}>
        {row.map((articleEach) => (
          <div key={articleEach.id} className='four columns block_item'>
            <Link to={`/articles/${articleEach.id}`}>
              <div className='top'>
                <div className='veil'></div>
                <div
                  className='block_image'
                  style={{
                    background: `url(/images/blocks/${articleEach.image}) no-repeat`,
                  }}
                ></div>
              </div>
              <div className='content'>
                <h3>{articleEach.title}</h3>
                <div>{articleEach.desc}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    ));
    return generatedArticles;
  };

  return <div>{showArticleBlocks()}</div>;
};

export default HomeArticles;
