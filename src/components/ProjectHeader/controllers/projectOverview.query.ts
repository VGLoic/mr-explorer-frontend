import { gql, DocumentNode } from "@apollo/client";

export const PROJECT_OVERVIEW: DocumentNode = gql`
  query project($projectId: String!) {
    project(projectId: $projectId) {
      id
      name
      description
      pathWithNamespace
      users {
        id
        name
        avatarUrl
      }
    }
  }
`;
