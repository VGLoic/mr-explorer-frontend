import React from "react";
import classnames from "classnames";
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
  ListItemText
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
// Types
import { Project } from "../controllers/projectQuery";
// Hooks
import { useDialog } from "hooks/useDialog";
// Styles
import { useStyles, Styles } from "./styles";

interface ProjectHeaderProps {
  project: Project;
}
const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const tooMuchUsers: boolean = project.users.length > 5;

  const { open, toggleDialog } = useDialog();

  const classes: Styles = useStyles();

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
        <DialogTitle>Project members</DialogTitle>
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
