"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState([]);
  const handleSearchChange = (e) => {
    // console.log(e.target.value.toLowerCase());
    setSearchText(e.target.value.toLowerCase());
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/prompt");
      const data = await response.json();
      setPosts(data);
      setSearch(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredPosts = posts.filter(
      (p) =>
        p.creator.username.toLowerCase().includes(searchText) ||
        p.tag.toLowerCase().includes(searchText) ||
        p.prompt.toLowerCase().includes(searchText)
    );
    // console.log(filteredPosts);
    setSearch(filteredPosts);
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full text-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={search} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
