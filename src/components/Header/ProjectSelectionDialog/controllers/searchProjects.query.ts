import { gql, DocumentNode } from "@apollo/client";

export const SEARCH_PROJECTS: DocumentNode = gql`
  query searchProjects($search: String!) {
    searchProjects(search: $search) {
      id
      name
      description
      pathWithNamespace
    }
  }
`;

export interface Project {
  id: string;
  name: string;
  description: string;
  pathWithNamespace: string;
}

export interface SearchProjectsData {
  searchProjects: Project[];
}

export interface SearchProjectsInput {
  search: string;
}
