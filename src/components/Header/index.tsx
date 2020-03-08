import React from "react";
import { useQuery } from "@apollo/client";
// UI Components
import { Grid, Hidden, CircularProgress } from "@material-ui/core";
// Controllers
import { CurrentUserData, CURRENT_USER } from "./controllers/currentUserQuery";

type HeaderProps = { className: string };
const Header = ({ className }: HeaderProps) => {
  const { loading, error, data } = useQuery<CurrentUserData>(CURRENT_USER);

  if (error) {
    return <div className={className}>Oh no, it's broken :(</div>;
  }

  return (
    <Grid
      className={className}
      container
      spacing={2}
      justify="space-around"
      alignItems="center"
    >
      <Hidden xsDown>
        <Grid item sm={3}>
          Animation here
        </Grid>
      </Hidden>
      <Grid item sm={6} xs={9}>
        Choice here
      </Grid>
      <Hidden xsDown>
        <Grid item sm={3}>
          {loading ? <CircularProgress /> : data?.currentUser.name}
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item sm={3}>
          My Icon
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default Header;
