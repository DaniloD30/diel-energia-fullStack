import { getTags } from "../services/tagsService";
import { useQuery } from "@tanstack/react-query";

const useTags = () =>
  useQuery({
    queryKey: ["getTags"],
    queryFn: async () => {
      const data = await getTags();
      return data;
    },
    refetchOnWindowFocus: false,
  });

export { useTags };
