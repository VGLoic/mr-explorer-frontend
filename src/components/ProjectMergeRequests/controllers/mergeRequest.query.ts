import { gql, DocumentNode } from "@apollo/client";
import { User } from "components/Header/controllers/currentUser.query";
import { MrStates } from "./useMrState";

export const PROJECT_MERGE_REQUESTS: DocumentNode = gql`
  query project(
    $projectId: String!
    $mrState: MrStates!
    $first: Int! = 4
    $fromDate: String = "2020-01-01"
    $toDate: String
    $after: String
  ) {
    project(projectId: $projectId) {
      id
      mergeRequests(
        mrState: $mrState
        first: $first
        after: $after
        fromDate: $fromDate
        toDate: $toDate
      ) {
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
            reviews {
              reviewedBy {
                id
                name
                avatarUrl
              }
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
  reviews: Reviews;
}

export interface Reviews {
  reviewedBy: User[];
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
  fromDate?: string;
  toDate?: string;
  first?: number;
  after?: string;
}
