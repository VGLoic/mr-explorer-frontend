import { gql, DocumentNode } from "@apollo/client";

export const CURRENT_PROJECT_ID: DocumentNode = gql`
  {
    currentProjectId @client
  }
`;

export interface CurrentProjectIdData {
  currentProjectId: string;
}
