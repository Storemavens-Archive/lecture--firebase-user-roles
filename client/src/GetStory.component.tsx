import React from "react";
import { useState } from "react";
import "./App.css";
import { fetchWithAuth } from "./auth/auth.utils";

interface Props {
  userId: string | null | undefined;
}
const GetStory = (props: Props) => {
  const { userId } = props;
  const [story, setStory] = useState<any>();
  const [storyId, setStoryId] = useState<any>();

  const getStory = async () => {
    if (!userId || !storyId) {
      return;
    }

    try {
      const res = await fetchWithAuth(
        `http://localhost:4000/stories/${storyId}`,
        {
          method: "GET",
        }
      );
      if (res.status === 403) {
        setStory(res.statusText);
        return;
      }

      const data = await res.json();
      if (data) {
        setStory(data);
        return;
      }
    } catch (err) {
      console.error(err);
      if (err.error) {
        setStory(err.error);
      }
    }
  };
  return (
    <div className="getStory">
      <input
        type="text"
        placeholder="storyId"
        onChange={(e) => {
          setStoryId(e.target.value);
        }}
      />
      <button type="button" onClick={() => getStory()}>
        Get Story
      </button>
      {story && <pre>{JSON.stringify(story, null, 2)}</pre>}
    </div>
  );
};

export default GetStory;
