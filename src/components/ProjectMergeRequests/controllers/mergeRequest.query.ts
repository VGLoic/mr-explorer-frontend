import { gql, DocumentNode } from "@apollo/client";
import { User } from "components/Header/controllers/currentUser.query";
import { MrStates } from "./useProjectMergeRequests";

export const PROJECT_MERGE_REQUESTS: DocumentNode = gql`
  query project(
    $projectId: String!
    $mrState: MrStates!
    $first: Int! = 4
    $after: String! = "2020-01-01"
  ) {
    project(projectId: $projectId) {
      id
      mergeRequests(mrState: $mrState, first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            id
            iid
            title
            description
            state
            createdAt
            author {
              id
              name
              avatarUrl
            }
            userNotesCount
            webUrl
            approvedBy {
              id
              name
              avatarUrl
            }
          }
        }
      }
    }
  }
`;

export interface MergeRequest {
  id: string;
  iid: string;
  title: string;
  description: string;
  state: string;
  createdAt: string;
  author: User;
  userNotesCount: number;
  webUrl: string;
  approvedBy: User[];
}

export interface MergeRequestEdge {
  cursor: string;
  node: MergeRequest;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface MergeRequestConnection {
  __typename: string;
  edges: MergeRequestEdge[];
  pageInfo: PageInfo;
}

// DEPRECATED
// export interface ApprovalRule {
//   approvedBy: User[];
// }
// export interface ApprovalState {
//   rules: ApprovalRule[];
// }

export interface ProjectMergeRequestData {
  project: {
    __typename: string;
    id: string;
    mergeRequests: MergeRequestConnection;
  };
}

export interface ProjectMergeRequestInput {
  projectId: string;
  mrState: MrStates;
  first?: number;
  after?: string;
}
