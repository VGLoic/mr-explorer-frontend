import { gql, DocumentNode } from "@apollo/client";

export const CURRENT_USER: DocumentNode = gql`
  {
    currentUser {
      id
      name
      email
      avatarUrl
    }
  }
`;

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface CurrentUserData {
  currentUser: User;
}
