import { useQuery } from "@apollo/client";

import { PROJECT, ProjectData, ProjectInput, Project } from "./project.query";

export interface UseProject {
  loading: boolean;
  project: Project | undefined;
}
export const useProject = (projectId: string): UseProject => {
  const { loading, data } = useQuery<ProjectData, ProjectInput>(PROJECT, {
    variables: { projectId }
  });

  console.log("data: ", data);

  return {
    loading,
    project: data?.project
  };
};
