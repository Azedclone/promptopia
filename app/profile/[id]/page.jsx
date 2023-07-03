"use client";

import Profile from "@/components/Profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params?.id]);

  return (
    <Profile
      name={username}
      data={posts}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
    />
  );
};

export default UserProfile;
