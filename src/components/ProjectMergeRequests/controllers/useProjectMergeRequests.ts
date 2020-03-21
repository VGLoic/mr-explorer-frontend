import { useState } from "react";
import { ApolloError, useQuery } from "@apollo/client";
// Query
import {
  ProjectMergeRequestData,
  ProjectMergeRequestInput,
  PROJECT_MERGE_REQUESTS
} from "./mergeRequest.query";

export enum MrStates {
  Opened = "OPENED",
  Closed = "CLOSED",
  Merged = "MERGED",
  Locked = "LOCKED",
  All = "ALL"
}

export interface UseProjectMergeRequests {
  selectedMrState: MrStates;
  selectMrState: (mrState: MrStates) => void;
  initialLoading: boolean;
  loadingMore: boolean;
  data: ProjectMergeRequestData | null;
  error: ApolloError | undefined;
  onLoadMore: () => void;
}
export const useProjectMergeRequests = (
  projectId: string
): UseProjectMergeRequests => {
  const [selectedMrState, setSelectedMrState] = useState<MrStates>(
    MrStates.Opened
  );

  const selectMrState = (mrState: MrStates) => setSelectedMrState(mrState);

  const { data, error, fetchMore, networkStatus } = useQuery<
    ProjectMergeRequestData,
    ProjectMergeRequestInput
  >(PROJECT_MERGE_REQUESTS, {
    variables: { projectId, mrState: selectedMrState },
    notifyOnNetworkStatusChange: true
  });

  const onLoadMore = (): void => {
    if (!fetchMore || !data) return;
    const endCursorDate = new Date(
      data.project.mergeRequests.pageInfo.endCursor
    );
    endCursorDate.setSeconds(endCursorDate.getSeconds() + 10);
    const after: string = endCursorDate.toISOString();
    fetchMore({
      variables: {
        after
      },
      updateQuery: (
        previousResult: ProjectMergeRequestData,
        {
          fetchMoreResult
        }: { fetchMoreResult?: ProjectMergeRequestData | undefined }
      ): ProjectMergeRequestData => {
        if (!fetchMoreResult) return previousResult;

        const newEdges = fetchMoreResult.project.mergeRequests.edges;
        const pageInfo = fetchMoreResult.project.mergeRequests.pageInfo;

        return newEdges.length > 0
          ? {
              // Put the new mergeRequests at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
              project: {
                ...previousResult.project,
                mergeRequests: {
                  __typename: previousResult.project.mergeRequests.__typename,
                  edges: [
                    ...previousResult.project.mergeRequests.edges,
                    ...newEdges
                  ],
                  pageInfo
                }
              }
            }
          : previousResult;
      }
    });
  };

  return {
    selectedMrState,
    selectMrState,
    initialLoading: networkStatus === 1 || networkStatus === 2,
    loadingMore: networkStatus === 3,
    data: data || null,
    error,
    onLoadMore
  };
};
