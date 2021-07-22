type StoryRolesModel = {
  StoryOwner: string;
  StoryEditor: string[];
  StoryReader: string[];
};

type StoryModel = {
  id?: string;
  title: string;
  subtitle: string;
  status: string;
  doc: object;
  roles: StoryRolesModel;
  createdAt: number | unknown;
  updatedAt: number | unknown;
};

type UserModel = {
  id?: string;
  displayName: string;
  email: string;
  avatar: string;
  stories: string[];
  createdAt: number | unknown;
  updatedAt: number | unknown;
};
