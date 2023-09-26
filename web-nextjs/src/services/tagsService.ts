import { Tags } from "../interfaces/tagsInterface";
import { api } from "../lib";

export const getTags = async () => {
  const { data } = await api.get<Tags[]>(`tags`);

  return data;
};

