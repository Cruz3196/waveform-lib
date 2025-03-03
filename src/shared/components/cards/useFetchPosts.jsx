import { useState, useEffect } from "react";
import { db } from "../../../features/firebase.config"; // Adjust path if needed
import { collection, onSnapshot } from "firebase/firestore";

const useFetchPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      // Listen for real-time updates from Firestore
        const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(), // Spread data directly
                }))
            );
        });

      return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

  return posts; // Return fetched posts
};

export default useFetchPosts;
