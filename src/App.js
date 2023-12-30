import "./styles.css";
import React from "react";
import Comment from "./comment";

export default function App() {
  let [commentData, setCommentData] = React.useState({
    llvap: {
      children: [],
      parent: [],
      text: "Hi! This is an example comment.",
    },
  });
  let [commentInput, setCommentInput] = React.useState("");
  function getUId() {
    return (Math.random() + 1).toString(36).substring(7);
  }

  function onButtonClick() {
    let uid = getUId();
    setCommentData({
      ...commentData,
      [uid]: {
        text: commentInput,
        children: [],
        parent: [],
      },
    });
    setCommentInput("");
  }

  const parentCommentUIDs = commentData
    ? Object.keys(commentData).filter(
        (uid) => commentData[uid].parent.length === 0
      )
    : [];

  const comments = parentCommentUIDs.map((uid) => {
    return (
      <Comment
        commentData={commentData}
        setCommentData={setCommentData}
        uid={uid}
        key={uid}
      />
    );
  });

  return (
    <div className="App">
      <h1 className="Heading">Comment Widget</h1>
      <input
        className="Input"
        placeholder="Enter a comment"
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
      ></input>
      <br />
      <button
        className="AddComment"
        disabled={commentInput.length === 0}
        onClick={() => onButtonClick()}
      >
        ADD COMMENT
      </button>
      <br />
      {comments}
    </div>
  );
}
