import "./styles.css";
import React from "react";

export default function Comment({ commentData, setCommentData, uid }) {
  const [replyText, setReplyText] = React.useState("");
  const childUIDs = commentData[uid].children;
  function getUId() {
    return (Math.random() + 1).toString(36).substring(7);
  }
  function getChildren(uid, children) {
    if (commentData[uid].children.length === 0) {
      return [];
    } else {
      commentData[uid].children.forEach((child) => {
        children = [...children, child, ...getChildren(child, children)];
      });
    }
    return children;
  }
  function onDelete() {
    const children = getChildren(uid, []);
    const newCommentData = { ...commentData };
    if (newCommentData[uid].parent.length > 0) {
      const newChildren = newCommentData[
        newCommentData[uid].parent[0]
      ].children.filter((child) => child !== uid);
      newCommentData[newCommentData[uid].parent[0]].children = newChildren;
    }
    children.forEach((child) => {
      delete newCommentData[child];
    });
    delete newCommentData[uid];
    setCommentData(newCommentData);
  }
  function onReply() {
    const newUID = getUId();
    setCommentData({
      ...commentData,
      [uid]: {
        ...commentData[uid],
        children: [...commentData[uid].children, newUID]
      },
      [newUID]: {
        text: replyText,
        children: [],
        parent: [uid]
      }
    });
    setReplyText("");
  }
  const ParentComment = (
    <div className="CommentContainer">
      {commentData[uid].text}
      <button className="ButtonDelete" onClick={() => onDelete()}>
        DELETE
      </button>
      <br />
      <input
        className="CommentReplyInput"
        placeholder="Type Reply"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      ></input>
      <button
        className="ButtonReply"
        onClick={() => onReply()}
        disabled={replyText.length === 0}
      >
        REPLY
      </button>
    </div>
  );
  const Replies = childUIDs.map((uid) => {
    return (
      <div className="RepliesContainer" key={uid}>
        <Comment
          commentData={commentData}
          setCommentData={setCommentData}
          uid={uid}
        ></Comment>
      </div>
    );
  });
  return (
    <div>
      {ParentComment}
      {Replies}
    </div>
  );
}
