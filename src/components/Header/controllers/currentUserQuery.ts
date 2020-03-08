import { gql, DocumentNode } from "@apollo/client";

export const CURRENT_USER: DocumentNode = gql`
  {
    currentUser {
      id
      name
      email
    }
  }
`;

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
}

export interface CurrentUserData {
  currentUser: CurrentUser;
}
