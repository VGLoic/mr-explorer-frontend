import React from "react";
// Hooks
import { useCurrentProject } from "context/currentProject";

const Dashboard = () => {
  const { currentProjectId } = useCurrentProject();
  return (
    <div>
      <h1>Yo yo dashboard</h1>
      <div>ProjectId: {currentProjectId}</div>
    </div>
  );
};

export default Dashboard;
