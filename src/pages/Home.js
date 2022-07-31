import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
const Home = ({ posts }) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--img",
      `url(${posts[0]?.img})`
    );
  }, [posts]);

  return (
    <div className="home-div">
      <div className="last-post-div">
        <h2>{posts[0]?.title}</h2>
        <p style={{ wordBreak: "break-all" }}>
          {posts[0]?.content.slice(0, 70)} ...{" "}
        </p>
        <Link to={`/post/${posts[0]?.id}`}>
          <p>Continue Reading</p>
        </Link>
      </div>
      <div className="posts-grid">
        {posts.slice(1)?.map((post) => {
          return (
            <div className="post-div">
              <div
                className="img-div"
                style={{ backgroundImage: `url(${post.img})` }}
              ></div>
              <div className="post-info-div">
                <h2>{post.title}</h2>
                <p style={{ fontSize: "13px", color: "gray", margin: "0" }}>
                  {post.createdAt.toDate().toLocaleString()}
                </p>
                <p>{post.content.slice(0, 25)} ...</p>
                <Link to={`/post/${post.id}`}>
                  <p>Continue Reading</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
