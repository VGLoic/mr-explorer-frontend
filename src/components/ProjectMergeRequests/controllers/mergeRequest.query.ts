import { gql, DocumentNode } from "@apollo/client";
import { User } from "components/Header/controllers/currentUser.query";

export const PROJECT_MERGE_REQUESTS: DocumentNode = gql`
  query project(
    $projectId: String!
    $first: Int! = 4
    $after: String! = "2019-01-01"
  ) {
    project(projectId: $projectId) {
      id
      mergeRequests(first: $first, after: $after) {
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
            approvalState {
              rules {
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
  approvalState: ApprovalState;
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

export interface ApprovalRule {
  approvedBy: User[];
}
export interface ApprovalState {
  rules: ApprovalRule[];
}

export interface ProjectMergeRequestData {
  project: {
    __typename: string;
    id: string;
    mergeRequests: MergeRequestConnection;
  };
}

export interface ProjectMergeRequestInput {
  projectId: string;
  first?: number;
  after?: string;
}
