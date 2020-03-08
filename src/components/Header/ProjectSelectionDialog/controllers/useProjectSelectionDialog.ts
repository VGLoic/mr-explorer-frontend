import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash/debounce";
// Query
import {
  SearchProjectsData,
  Project,
  SearchProjectsInput,
  SEARCH_PROJECTS
} from "components/Header/controllers/searchProjectsQuery";

export interface UseProjectSelectionDialog {
  triggerSearch: (search: string) => void;
  called: boolean;
  loading: boolean;
  projects: Project[] | undefined;
  selectProject: (projectId: string) => void;
}

export const useProjectSelectionDialog = (): UseProjectSelectionDialog => {
  const [projectId, setProjectId] = useState<string | null>(null);

  console.log("projectId: ", projectId);

  const selectProject = (projectId: string): void => setProjectId(projectId);

  const [searchProjects, { loading, data, refetch, called }] = useLazyQuery<
    SearchProjectsData,
    SearchProjectsInput
  >(SEARCH_PROJECTS);

  const triggerSearch = debounce((search: string): void => {
    if (!refetch) {
      searchProjects({ variables: { search } });
    } else {
      refetch({ search });
    }
  }, 500);

  return {
    triggerSearch,
    called,
    loading,
    projects: data?.searchProjects,
    selectProject
  };
};
