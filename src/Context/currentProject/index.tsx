import React, {
  createContext,
  useEffect,
  useCallback,
  useMemo,
  useContext
} from "react";
import { useQuery } from "@apollo/client";
import {
  CURRENT_PROJECT_ID,
  CurrentProjectIdData
} from "./currentProjectQuery";

const SELECTED_PROJECT_ID_KEY: string = "mr-explorer_project_id_key";

const CurrentProjectContext: React.Context<any> = createContext(null);

export interface UseCurrentProject {
  selectCurrentProject: (projectId: string) => void;
  currentProjectId: string | undefined;
}

type ProjectProviderProps = any;
export const CurrentProjectProvider = (props: ProjectProviderProps) => {
  const { data, client } = useQuery<CurrentProjectIdData>(CURRENT_PROJECT_ID);

  const selectCurrentProject = useCallback<(projectId: string) => void>(
    (projectId: string): void => {
      client.writeData({ data: { currentProjectId: projectId } });
    },
    [client]
  );

  useEffect(() => {
    const cachedProjectId: string | null = localStorage.getItem(
      SELECTED_PROJECT_ID_KEY
    );
    if (cachedProjectId) {
      selectCurrentProject(cachedProjectId);
    }
  }, [selectCurrentProject]);

  useEffect(() => {
    if (data?.currentProjectId) {
      localStorage.setItem(SELECTED_PROJECT_ID_KEY, data.currentProjectId);
    }
  }, [data]);

  const value: UseCurrentProject = useMemo(
    (): UseCurrentProject => ({
      selectCurrentProject,
      currentProjectId: data?.currentProjectId
    }),
    [data, selectCurrentProject]
  );

  return <CurrentProjectContext.Provider value={value} {...props} />;
};

export const useCurrentProject = (): UseCurrentProject => {
  const context: UseCurrentProject = useContext(CurrentProjectContext);

  if (!context) {
    throw new Error(
      "useCurrentProject needs to be used in a child of ProjectProvider"
    );
  }

  return context;
};
