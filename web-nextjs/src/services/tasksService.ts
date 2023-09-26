import { Tasks } from "../interfaces/tasksInterface";
import { api } from "../lib";

const haveNext = (tagsId: string[]) => {
  if (tagsId.length === 1) {
    return `taskId=${tagsId[0]}&taskId=`;
  }
  const tagsConcatened = tagsId.map((tag, index) => {
    let string = "";
    if (index === tagsId.length) {
      string += `taskId=${tag}`;
    } else {
      string += `taskId=${tag}&`;
    }
  });
  return tagsConcatened;
};

export const getTasks = async (title: string, tagsId: string[]) => {
  if (tagsId && tagsId.length > 0) {
    const { data } = await api.get<Tasks[]>(
      `tasks/tag?title=${title}&${haveNext(tagsId)}`
    );

    return data;
  }
  if (title !== "") {
    const { data } = await api.get<Tasks[]>(`tasks/${title}`);

    return data;
  }
  const { data } = await api.get<Tasks[]>(`tasks`);

  return data;
};
