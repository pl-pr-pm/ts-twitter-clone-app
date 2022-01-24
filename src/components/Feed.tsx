import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import TweetInput from "./TweetInput";
import styles from "./Feed.module.css";
import { UnsubscribeTwoTone } from "@material-ui/icons";
import Post from "./Post";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([
    { id: "", avatar: "", image: "", text: "", timestamp: null, username: "" },
  ]);

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
          }))
        )
      );
    return () => unSub();
  }, []);

  return (
    <div className={styles.feed}>
      <TweetInput />
      {/* Post コンポーネントに posts そのものを渡さないわけ → 新規で追加された post もレンダリングしやすくするため。
       post は、snapshot で取得しているので、サブスクしている間、postのデータがfirestoreに追加されると、stateのpostにも追加される
       一度にpostsを送ってしまうと、新規追加分のデータの表示の実装がコストかかるため、このような実装にしていると思われる
       ただ、この方法だと、post が追加されるたびに、postコンポーネントの処理が全て実行されてしまうので、パフォーマンスは悪い*/}
      {posts[0]?.id && (
        <>
          {posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              avatar={post.avatar}
              image={post.image}
              text={post.text}
              timestamp={post.timestamp}
              username={post.username}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Feed;
