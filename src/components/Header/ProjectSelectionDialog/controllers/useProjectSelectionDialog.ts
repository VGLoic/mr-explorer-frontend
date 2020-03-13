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
  selectedProjectId: string | null;
  onClose: () => void;
  confirm: () => void;
}

export const useProjectSelectionDialog = (
  toggleDialog: () => void
): UseProjectSelectionDialog => {
  const [projectId, setProjectId] = useState<string | null>(null);

  console.log("projectId: ", projectId);

  const [
    searchProjects,
    { loading, data, refetch, called, client }
  ] = useLazyQuery<SearchProjectsData, SearchProjectsInput>(SEARCH_PROJECTS);

  const selectProject = (projectId: string): void => setProjectId(projectId);
  const onClose = (): void => {
    toggleDialog();
    setProjectId(null);
  };

  const confirm = (): void => {
    client?.writeData({ data: { selectedProjectId: projectId } });
    toggleDialog();
    setProjectId(null);
  };

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
    selectProject,
    selectedProjectId: projectId,
    onClose,
    confirm
  };
};
