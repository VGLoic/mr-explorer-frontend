import React from "react";
// Hooks
import { useProject } from "./controllers/useProject";
// UI Components
import { CircularProgress, Divider, Grid } from "@material-ui/core";
// Components
import ProjectHeader from "./ProjectHeader";

type ProjectProps = {
  projectId: string;
};
const Project = ({ projectId }: ProjectProps) => {
  const { loading, project } = useProject(projectId);

  if (loading) {
    return <CircularProgress />;
  }

  if (!project) {
    return <div>Oh no it looks like there have been a problem :(</div>;
  }

  return (
    <Grid container direction="column" spacing={4}>
      <ProjectHeader project={project} />
      <Divider />
    </Grid>
  );
};

export default Project;
