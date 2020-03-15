import { gql, DocumentNode } from "@apollo/client";
import { User } from "components/Header/controllers/currentUser.query";

export const PROJECT: DocumentNode = gql`
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

export interface Project {
  id: string;
  name: string;
  description: string;
  pathWithNamespace: string;
  users: User[];
}

export interface ProjectData {
  project: Project;
}

export interface ProjectInput {
  projectId: string;
}
