import React from "react";
import { useState } from "react";
import "./App.css";
import { fetchWithAuth } from "./auth/auth.utils";

interface Props {
  userId: string | null | undefined;
}
const NewStory = (props: Props) => {
  const { userId } = props;
  const [story, setStory] = useState<any>();

  const postNewStory = () => {
    if (!userId) {
      return;
    }
    const story = {
      title: "test Story",
      subtitle: "subtitle",
      status: "DRAFT",
      doc: {},
      roles: {
        StoryOwner: userId,
        StoryEditor: [],
        StoryReader: [],
      },
    };

    fetchWithAuth("http://localhost:4000/stories", {
      method: "POST",
      body: JSON.stringify({ story }),
    })
      .then((res) => res.json())
      .then((res) => setStory(res.story));
  };
  return (
    <div className="NewStory">
      <button type="button" onClick={() => postNewStory()}>
        New Story
      </button>
      {story && <pre>{JSON.stringify(story, null, 2)}</pre>}
    </div>
  );
};

export default NewStory;
