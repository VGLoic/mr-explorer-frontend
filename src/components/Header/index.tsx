import React from "react";
import { useQuery } from "@apollo/client";
// UI Components
import {
  Grid,
  Hidden,
  CircularProgress,
  Button,
  Typography
} from "@material-ui/core";
// Components
import ProjectSelectionDialog from "./ProjectSelectionDialog";
// Controllers
import { CurrentUserData, CURRENT_USER } from "./controllers/currentUserQuery";
import { useDialog } from "hooks/useDialog";
import { useCurrentProject } from "hooks/useCurrentProject";
// Styles
import { useStyles } from "./styles";

type HeaderProps = { className: string };
const Header = ({ className }: HeaderProps) => {
  const { loading, error, data } = useQuery<CurrentUserData>(CURRENT_USER);
  const { open, toggleDialog } = useDialog();
  const { currentProjectId } = useCurrentProject();
  const classes = useStyles();

  if (error) {
    return <div className={className}>Oh no, it's broken :(</div>;
  }

  return (
    <>
      <Grid
        className={className}
        container
        justify="space-around"
        alignItems="center"
      >
        <Hidden xsDown>
          <Grid item sm={3}>
            Nyan cat later on
          </Grid>
        </Hidden>
        <Grid item container sm={6} xs={9} justify="center">
          <Button variant="outlined" color="primary" onClick={toggleDialog}>
            {Boolean(currentProjectId)
              ? "Change current project"
              : "Select a project"}
          </Button>
        </Grid>
        <Hidden xsDown>
          <Grid item container sm={3} justify="flex-end">
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid item container justify="flex-end">
                <Typography>{data?.currentUser.name}</Typography>
                <img
                  src={data?.currentUser.avatarUrl}
                  alt="avatar-user"
                  className={classes.avatar}
                />
              </Grid>
            )}
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid item sm={3}>
            My Icon
          </Grid>
        </Hidden>
      </Grid>
      <ProjectSelectionDialog open={open} toggleDialog={toggleDialog} />
    </>
  );
};

export default Header;
