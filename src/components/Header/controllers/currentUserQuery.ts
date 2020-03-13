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

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface CurrentUserData {
  currentUser: CurrentUser;
}
