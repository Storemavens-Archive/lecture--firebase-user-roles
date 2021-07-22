import logger from "../utils/logger";
import { db, dbTimestamp } from "../vendor/firebase.vendor";
const STORIES_COLLECTION = "stories";
const USERS_COLLECTION = "users";

export const getStories = async () => {
  const storiesRef = db.collection(STORIES_COLLECTION);
  return storiesRef.listDocuments();
};

export const createStory = async (userId: string, story: StoryModel) => {
  const storiesRef = db.collection(STORIES_COLLECTION);
  const newDoc = storiesRef.doc();

  try {
    const newStory: StoryModel = {
      title: story.title,
      subtitle: story.subtitle || "",
      status: "DRAFT",
      doc: story.doc || {},
      roles: {
        StoryOwner: userId,
        StoryEditor: [],
        StoryReader: [],
      },
      id: newDoc.id,
      createdAt: dbTimestamp() as unknown as number,
      updatedAt: dbTimestamp() as unknown as number,
    };

    // Add story to newly created doc
    await newDoc.set(newStory);
    // Add story to user
    await updateUserStories(userId, [newDoc.id]);

    return newStory;
  } catch (err) {
    logger.error(err, "CreateStory");
  }
};

export const updateUserStories = async (
  userId: string,
  storyIds?: string[]
) => {
  const usersRef = db.collection(USERS_COLLECTION).doc(userId);
  const doc = await usersRef.get();
  if (!doc.exists) {
    throw new Error(`UserId '${userId}' does not exist`);
  }

  const user = doc.data() as UserModel;
  const updatedUser: UserModel = {
    ...user,
    stories: Array.from(new Set([...user.stories, ...storyIds])),
  };

  await usersRef.set(updatedUser);
  return updatedUser;
};
