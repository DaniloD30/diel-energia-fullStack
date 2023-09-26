import { Tasks } from "@/interfaces/tasksInterface";
import { getTasks } from "../services/tasksService";
import { useQuery } from "@tanstack/react-query";

const useTasks = (title: string, tagsId: string[]) =>
  useQuery({
    queryKey: ["getTasks", title, tagsId],
    queryFn: async () => {
      const data = await getTasks(title, tagsId);

      return data;
    },

    select: (data) => {
      return data.map((task) => {
        return {
          event_id: task.id,
          title: task.title,
          start: task.dateHour ? new Date(task.dateHour) : null,
          end: task.duration ? new Date(task.duration) : null,
          description: task.description,
          tags: task.tags,
        };
      });
    },
    refetchOnWindowFocus: false,
  });

export { useTasks };
