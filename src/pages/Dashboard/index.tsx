import React from "react";
// Hooks
import { useCurrentProject, UseCurrentProject } from "hooks/useCurrentProject";

const Dashboard = () => {
  const { currentProjectId }: UseCurrentProject = useCurrentProject();
  return (
    <div>
      <h1>Yo yo dashboard</h1>
      <div>ProjectId: {currentProjectId}</div>
    </div>
  );
};

export default Dashboard;
