import React from "react";
import classnames from "classnames";
import { useQuery } from "@apollo/client";
// UI Components
import {
  Typography,
  Grid,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
// Hooks
import { useDialog } from "hooks/useDialog";
import {
  PROJECT_DESCRIPTION,
  ProjectData,
  ProjectInput
} from "./controllers/projectHeader.query";
// Styles
import { useStyles, Styles } from "./styles";

interface ProjectHeaderProps {
  projectId: string;
}
const ProjectHeader = ({ projectId }: ProjectHeaderProps) => {
  const { data, loading, error } = useQuery<ProjectData, ProjectInput>(
    PROJECT_DESCRIPTION,
    {
      variables: { projectId }
    }
  );
  const { open, toggleDialog } = useDialog();
  const classes: Styles = useStyles();

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
        <Typography variant="h6" component="h6" color="textPrimary">
          This project has not been found. Please select another one.
        </Typography>
      </Grid>
    );
  }

  const project = data.project;

  const tooMuchUsers: boolean = project.users.length > 5;

  return (
    <>
      <Grid item container xs={12} direction="row" justify="space-between">
        <Grid item container sm={8}>
          <Typography
            variant="h6"
            component="h6"
            className={classes.projectTitle}
            color="textPrimary"
          >
            {project.name.toUpperCase()}
          </Typography>
          <AvatarGroup>
            {tooMuchUsers ? (
              <div className={classes.avatarWrapper}>
                {project.users.slice(0, 5).map(user => (
                  <Tooltip title={user.name} key={user.id}>
                    <Avatar
                      className={classes.avatar}
                      alt={user.name}
                      src={user.avatarUrl}
                    />
                  </Tooltip>
                ))}
                <Avatar
                  className={classnames(classes.avatar, classes.seeMore)}
                  onClick={toggleDialog}
                >
                  <Typography variant="subtitle2" color="textPrimary">
                    +{project.users.length - 5}
                  </Typography>
                </Avatar>
              </div>
            ) : (
              project.users.map(user => (
                <Tooltip title={user.name}>
                  <Avatar
                    className={classes.avatar}
                    alt={user.name}
                    src={user.avatarUrl}
                    key={user.id}
                  />
                </Tooltip>
              ))
            )}
          </AvatarGroup>
        </Grid>
        <Grid item container sm={4} justify="flex-end">
          <Typography
            variant="body1"
            className={classes.fullPathLabel}
            color="textPrimary"
          >
            Full path:
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {project.pathWithNamespace}
          </Typography>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={toggleDialog}>
        <DialogTitle>Project users</DialogTitle>
        <List>
          {project.users.map(user => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar
                  className={classes.avatar}
                  alt={user.name}
                  src={user.avatarUrl}
                  key={user.id}
                />
              </ListItemAvatar>
              <ListItemText>{user.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};

export default ProjectHeader;
