import { useQuery } from "@apollo/client";
import {
  CURRENT_PROJECT_ID,
  CurrentProjectIdData
} from "./currentProjectQuery";

export interface UseCurrentProject {
  selectCurrentProject: (projectId: string) => void;
  currentProjectId: string | undefined;
}

const useCurrentProject = (): UseCurrentProject => {
  const { data, client } = useQuery<CurrentProjectIdData>(CURRENT_PROJECT_ID);

  const selectCurrentProject = (projectId: string): void => {
    client.writeData({ data: { currentProjectId: projectId } });
  };

  return {
    selectCurrentProject,
    currentProjectId: data?.currentProjectId
  };
};

export { useCurrentProject };
