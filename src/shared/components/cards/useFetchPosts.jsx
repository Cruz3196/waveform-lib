import { useEffect, useState } from "react";
import { db } from "../../../features/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  return posts; 
};

export default useFetchPosts;
