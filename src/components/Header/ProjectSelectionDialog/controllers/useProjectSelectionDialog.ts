import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash/debounce";
// Query
import {
  SearchProjectsData,
  Project,
  SearchProjectsInput,
  SEARCH_PROJECTS
} from "components/Header/controllers/searchProjectsQuery";
import { useCurrentProject } from "context/currentProject";

export interface UseProjectSelectionDialog {
  triggerSearch: (search: string) => void;
  called: boolean;
  loading: boolean;
  projects: Project[] | null;
  selectProject: (projectId: string) => void;
  selectedProjectId: string | null;
  onClose: () => void;
  confirm: () => void;
}

export const useProjectSelectionDialog = (
  toggleDialog: () => void
): UseProjectSelectionDialog => {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const { selectCurrentProject } = useCurrentProject();

  const [searchProjects, { loading, data, refetch, called }] = useLazyQuery<
    SearchProjectsData,
    SearchProjectsInput
  >(SEARCH_PROJECTS);

  useEffect(() => {
    if (data) {
      setProjects(data.searchProjects);
    }
  }, [data]);

  const selectProject = (projectId: string): void => setProjectId(projectId);
  const onClose = (): void => {
    toggleDialog();
    setProjectId(null);
    setProjects(null);
  };

  const confirm = (): void => {
    if (projectId) {
      selectCurrentProject(projectId);
      toggleDialog();
      setProjectId(null);
      setProjects(null);
    }
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
    projects,
    selectProject,
    selectedProjectId: projectId,
    onClose,
    confirm
  };
};
