import React, { useEffect } from "react";
import styles from "./App.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import Feed from "./components/Feed";
import Auth from "./components/Auth";

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    // firebaseのユーザーの認証状況に変化があった場合に実行される
    // login, logout userchanged ...
    // unSub -> func
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("auth Changed authUser True");
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        console.log("auth Changed authUser Flase");
        dispatch(logout());
      }
    });
    // アンマウント後サブスクが不要なのでアンサブ
    return () => unSub();
  }, [dispatch]);

  return (
    <>
      {user.uid ? (
        <div className={styles.app}>
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
