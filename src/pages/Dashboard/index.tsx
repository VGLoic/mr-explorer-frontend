import React from "react";
// UI Components
import { Typography } from "@material-ui/core";
// Components
import Project from "components/Project";
// Hooks
import { useCurrentProject } from "context/currentProject";

const Dashboard = () => {
  const { currentProjectId } = useCurrentProject();

  if (!currentProjectId) {
    return (
      <Typography variant="h6" component="h6">
        No project has been selected yet.
      </Typography>
    );
  }

  return <Project projectId={currentProjectId} />;
};

export default Dashboard;
