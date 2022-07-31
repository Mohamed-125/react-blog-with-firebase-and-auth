import React, { useEffect, useRef, useState } from "react";
import {
  serverTimestamp,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { BsFillTrashFill } from "react-icons/bs";
import { commentsColRef, auth, db, colRef } from "../Config";

const Comments = ({ post, postId }) => {
  const [comments, setComments] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const q = query(commentsColRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snap) => {
      setComments([]);
      snap.docs.forEach((doc) => {
        setComments((pre) => [...pre, { ...doc.data(), id: doc.id }]);
      });
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (ref.current.value) {
      addDoc(commentsColRef, {
        createdAt: serverTimestamp(),
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        content: ref.current.value,
        userId: auth.currentUser.uid,
        postId: postId,
      });
      e.target.reset();
    } else {
      alert("please write something");
    }
  };

  return (
    <div className="post-comments">
      <h2>
        {comments.filter((comment) => comment.postId === postId).length}
        {""} Comments
      </h2>
      {localStorage.getItem("signIn") === "true" ? (
        <form onSubmit={submitHandler}>
          <input
            ref={ref}
            type="text"
            style={{ width: "100%", marginBottom: "30px" }}
          />
        </form>
      ) : (
        <p> log in first to be able to comment </p>
      )}

      <div>
        {comments
          .filter((comment) => comment.postId === postId)
          ?.map((comment) => {
            return (
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginBottom: "20px",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ borderRadius: "50%", width: "60px" }}
                  src={comment.photo}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: "1",
                  }}
                >
                  <div>
                    <h4 style={{ marginBottom: "5px" }}>{comment.name}</h4>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "gray",
                        margin: "0",
                        position: "relative",
                      }}
                    >
                      {post.createdAt?.toDate().toLocaleString()}
                    </p>
                    <p style={{ marginTop: "6px", fontSize: "15px" }}>
                      {comment.content}
                    </p>
                  </div>
                  {auth?.currentUser?.uid === comment.userId && (
                    <BsFillTrashFill
                      onClick={() => {
                        const docRef = doc(db, "comments", comment.id);
                        const result = window.confirm(
                          "are you sure that you want to delete this comment"
                        );
                        if (result) deleteDoc(docRef).then(alert("done"));
                      }}
                      className="comment-trash-icon"
                      style={{ fontSize: "22px", transition: "0.3s all ease" }}
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comments;
