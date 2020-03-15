import React from "react";
import { useQuery } from "@apollo/client";
// Query
import {
  ProjectMergeRequestData,
  ProjectMergeRequestInput,
  PROJECT_MERGE_REQUESTS
} from "./controllers/mergeRequest.query";
// UI Components
import { Grid, CircularProgress, Typography } from "@material-ui/core";
// Components
import MergeRequestCard from "./MergeRequestCard";

interface ProjectMergeRequestsProps {
  projectId: string;
}
const ProjectMergeRequests = ({ projectId }: ProjectMergeRequestsProps) => {
  const { data, loading, error } = useQuery<
    ProjectMergeRequestData,
    ProjectMergeRequestInput
  >(PROJECT_MERGE_REQUESTS, {
    variables: { projectId }
  });

  if (loading) {
    return (
      <Grid item>
        <CircularProgress />
      </Grid>
    );
  }

  if (error || !data?.project) {
    return (
      <Grid item>
        <Typography color="textSecondary">
          Oh no, we didn't succeed to retrieve the merge requests :(
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid item container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" color="textSecondary">
          Merge Requests:
        </Typography>
      </Grid>
      {data.project.mergeRequests.map(mergeRequest => (
        <MergeRequestCard key={mergeRequest.id} mergeRequest={mergeRequest} />
      ))}
    </Grid>
  );
};

export default ProjectMergeRequests;
