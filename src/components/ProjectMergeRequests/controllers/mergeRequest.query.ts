import { gql, DocumentNode } from "@apollo/client";
import { User } from "components/Header/controllers/currentUser.query";

export const PROJECT_MERGE_REQUESTS: DocumentNode = gql`
  query project($projectId: String!) {
    project(projectId: $projectId) {
      id
      pathWithNamespace
      mergeRequests {
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

export interface ApprovalRule {
  approvedBy: User[];
}
export interface ApprovalState {
  rules: ApprovalRule[];
}

export interface ProjectMergeRequestData {
  project: {
    id: string;
    mergeRequests: MergeRequest[];
  };
}

export interface ProjectMergeRequestInput {
  projectId: string;
}
