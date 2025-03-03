import React, { useState } from "react";
import { Hero, Cards, PostTables } from "../../shared";
import Pagination from "../..//shared/components/pagination/Pagination";
import useFetchPosts from "../../shared/components/cards/useFetchPosts"; 

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const posts = useFetchPosts();

  return (
    <>
      <Hero />
      <Cards currentPage={currentPage} postsPerPage={postsPerPage} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <PostTables/>
    </>
  );
};

export default Home;
