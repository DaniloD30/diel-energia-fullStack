import { Tasks } from "@/interfaces/tasksInterface";
import { getHolidays, getTasks } from "../services/tasksService";
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

const useHolidays = () =>
  useQuery({
    queryKey: ["getTasks"],
    queryFn: async () => {
      const data = await getHolidays();

      return data;
    },

    select: (data) => {
      return data.map((task, index) => {
        return {
          event_id: `${index}-${task.name}`,
          title: task.name,
          start: new Date(task.date),
          end: new Date(task.date),
          description: task.localName,
          countryCode: task.countryCode
        };
      });
    },
    refetchOnWindowFocus: false,
  });
export { useTasks , useHolidays };
