import React from "react";
import { useQuery } from "@apollo/client";
// UI Components
import {
  Grid,
  Hidden,
  CircularProgress,
  Button,
  Typography,
  Avatar,
  IconButton,
  SvgIcon,
  Tooltip
} from "@material-ui/core";
import { mdiBrightness6 } from "@mdi/js";
// Components
import ProjectSelectionDialog from "./ProjectSelectionDialog";
// Controllers
import { CurrentUserData, CURRENT_USER } from "./controllers/currentUser.query";
import { useDialog } from "hooks/useDialog";
// Styles
import { useStyles } from "./styles";
import { useTheme } from "context/theme";

type HeaderProps = { className: string };
const Header = ({ className }: HeaderProps) => {
  const { loading, error, data } = useQuery<CurrentUserData>(CURRENT_USER);
  const { open, toggleDialog } = useDialog();

  const { toggleMode, isDarkMode } = useTheme();

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
            <Typography color="textPrimary">Nyan cat later on</Typography>
          </Grid>
        </Hidden>
        <Grid item container sm={6} xs={9} justify="center">
          <Button variant="outlined" onClick={toggleDialog}>
            Select a project
          </Button>
        </Grid>
        <Hidden xsDown>
          <Grid item container sm={3} justify="flex-end">
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid item container justify="flex-end" alignItems="center">
                <Tooltip
                  title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                >
                  <IconButton onClick={toggleMode}>
                    <SvgIcon>
                      <path d={mdiBrightness6} />
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
                <Avatar
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
