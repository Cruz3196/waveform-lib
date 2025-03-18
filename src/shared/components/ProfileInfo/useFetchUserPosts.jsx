import { useEffect, useState } from "react";
import { db, auth } from "../../../features/firebase.config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const useFetchUserPosts = () => {
    const [posts, setPosts] = useState([]);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const q = query(collection(db, "posts"), where("userId", "==", user.uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
            });
            return () => unsubscribe();
        }  
    }, [user]);

    return posts;
};

export default useFetchUserPosts;
