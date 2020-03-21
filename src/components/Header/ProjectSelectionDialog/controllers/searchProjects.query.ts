import { gql, DocumentNode } from "@apollo/client";

export const SEARCH_PROJECTS: DocumentNode = gql`
  query projects($search: String!, $first: Int! = 3, $after: Int! = 0) {
    searchProjects(search: $search, first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
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
  endCursor: number;
}

export interface ProjectConnection {
  __typename: string;
  edges: ProjectEdge[];
  pageInfo: PageInfo;
}

export interface SearchProjectsInput {
  search: string;
  first?: number;
  after?: number;
}
