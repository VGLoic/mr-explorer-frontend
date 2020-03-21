import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash/debounce";
import { useHistory } from "react-router-dom";
// Query
import {
  SearchProjectsData,
  SearchProjectsInput,
  SEARCH_PROJECTS
} from "./searchProjects.query";

export interface UseProjectSelectionDialog {
  triggerSearch: (search: string) => void;
  onLoadMore: () => void;
  called: boolean;
  initialLoading: boolean;
  loadingMore: boolean;
  researchLoading: boolean;
  data: SearchProjectsData | null;
  selectProject: (projectId: string) => void;
  selectedProjectId: string | null;
  onClose: () => void;
  confirm: () => void;
}

export const useProjectSelectionDialog = (
  toggleDialog: () => void
): UseProjectSelectionDialog => {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [data, setData] = useState<SearchProjectsData | null>(null);
  const history = useHistory();

  const [
    searchProjects,
    { data: queryData, refetch, called, fetchMore, networkStatus }
  ] = useLazyQuery<SearchProjectsData, SearchProjectsInput>(SEARCH_PROJECTS, {
    notifyOnNetworkStatusChange: true
  });

  useEffect(() => {
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);

  const selectProject = (projectId: string): void => setProjectId(projectId);
  const onClose = (): void => {
    toggleDialog();
    setProjectId(null);
    setData(null);
  };

  const confirm = (): void => {
    if (projectId) {
      history.push(`/projects/${projectId}`);
      toggleDialog();
      setProjectId(null);
      setData(null);
    }
  };

  const triggerSearch = debounce((search: string): void => {
    if (!refetch) {
      searchProjects({ variables: { search } });
    } else {
      refetch({ search });
    }
  }, 500);

  const onLoadMore = (): void => {
    if (!fetchMore || !data) return;
    fetchMore({
      variables: {
        after: data.searchProjects.pageInfo.endCursor
      },
      updateQuery: (
        previousResult: SearchProjectsData,
        {
          fetchMoreResult
        }: { fetchMoreResult?: SearchProjectsData | undefined }
      ): SearchProjectsData => {
        if (!fetchMoreResult) return previousResult;

        const newEdges = fetchMoreResult.searchProjects.edges;
        const pageInfo = fetchMoreResult.searchProjects.pageInfo;
        return newEdges.length > 0
          ? {
              // Put the new searchProjects at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
              searchProjects: {
                __typename: previousResult.searchProjects.__typename,
                edges: [...previousResult.searchProjects.edges, ...newEdges],
                pageInfo
              }
            }
          : previousResult;
      }
    });
  };

  return {
    triggerSearch,
    onLoadMore,
    called,
    initialLoading: networkStatus === 1,
    researchLoading: networkStatus === 1 || networkStatus === 2,
    loadingMore: networkStatus === 3,
    data,
    selectProject,
    selectedProjectId: projectId,
    onClose,
    confirm
  };
};
