import { ApolloError, useQuery } from "@apollo/client";
// Query
import {
  ProjectMergeRequestData,
  ProjectMergeRequestInput,
  PROJECT_MERGE_REQUESTS
} from "./mergeRequest.query";

export interface UseProjectMergeRequests {
  loading: boolean;
  data: ProjectMergeRequestData | null;
  error: ApolloError | undefined;
  onLoadMore: () => void;
}
export const useProjectMergeRequests = (
  projectId: string
): UseProjectMergeRequests => {
  const { data, loading, error, fetchMore } = useQuery<
    ProjectMergeRequestData,
    ProjectMergeRequestInput
  >(PROJECT_MERGE_REQUESTS, {
    variables: { projectId },
    fetchPolicy: "cache-and-network"
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
    loading,
    data: data || null,
    error,
    onLoadMore
  };
};
