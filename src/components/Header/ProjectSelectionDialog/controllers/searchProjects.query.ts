import { gql, DocumentNode } from "@apollo/client";

export const SEARCH_PROJECTS: DocumentNode = gql`
  query searchProjects($search: String!) {
    searchProjects(search: $search) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          name
          description
          pathWithNamespace
        }
      }
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
  searchProjects: ProjectConnection;
}

export interface ProjectEdge {
  cursor: number;
  node: Project;
}

export interface PageInfo {
  hasNextPage: boolean;
}

export interface ProjectConnection {
  edges: ProjectEdge[];
  pageInfo: PageInfo;
}

export interface SearchProjectsInput {
  search: string;
}
