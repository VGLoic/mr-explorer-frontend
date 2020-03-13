import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_SELECTED_PROJECT_ID = gql`
  {
    selectedProjectId @client
  }
`;

const Dashboard = () => {
  const { data } = useQuery(GET_SELECTED_PROJECT_ID);
  return (
    <div>
      <h1>Yo yo dashboard</h1>
      <div>ProjectId: {data?.selectedProjectId}</div>
    </div>
  );
};

export default Dashboard;
