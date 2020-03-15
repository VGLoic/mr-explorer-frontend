import React from "react";
// UI Components
import { Grid, Divider } from "@material-ui/core";
// Components
import ProjectHeader from "components/ProjectHeader";
// Hooks
import { useParams, Redirect } from "react-router-dom";

const Dashboard = () => {
  const { projectId } = useParams();

  if (!projectId) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container direction="column" spacing={4}>
      <ProjectHeader projectId={projectId} />
      <Divider />
    </Grid>
  );
};

export default Dashboard;
