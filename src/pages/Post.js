import React, { useEffect, useRef, useState } from "react";
import { db } from "../Config";
import {
  doc,
  getDoc,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Comments from "../Components/Comments";
const Post = ({ posts }) => {
  const [post, setPost] = useState({});
  const params = useParams();
  const docRef = doc(db, "posts", params.id);

  const showPostHandler = () => {
    getDoc(docRef).then((res) => {
      setPost(res.data());
      document.querySelector("#post-content").innerHTML = res.data().content;
    });
  };

  useEffect(() => {
    showPostHandler();
  }, [params.id]);

  return (
    <div className="post-page">
      <div className="post-content-comments">
        <div className="post-content">
          <img src={post.img}></img>
          <h3>{post.title}</h3>
          <div id="post-content"></div>
        </div>

        {/* comments start */}

        <Comments
          showPostHandler={showPostHandler}
          postId={params.id}
          post={post}
        />

        {/* comments end */}
      </div>
      <div className="other-posts">
        <h2>Other Posts</h2>
        {posts.slice(0, 6)?.map((post) => {
          return (
            <div className="post-div">
              <div className="post-info-div">
                <h3>
                  {post.title.length > 16
                    ? post.title.slice(0, 16) + " ..."
                    : post.title}
                </h3>
                <p style={{ fontSize: "13px", color: "gray", margin: "0" }}>
                  {post?.createdAt?.toDate().toLocaleString()}
                </p>
                <p>{post.content.slice(0, 25)} ...</p>
                <Link
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                  to={`/post/${post.id}`}
                >
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

export default Post;
