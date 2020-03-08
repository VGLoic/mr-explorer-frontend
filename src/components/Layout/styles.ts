import { makeStyles, Theme } from "@material-ui/core";

const styles = ({ spacing, palette }: Theme): Styles => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    flex: `0 0 ${spacing(7)}px`,
    display: "flex",
    alignItems: "center",
    background: palette.background.paper
  },
  content: {
    flex: 1,
    minHeight: `calc(100vh - 56px)`,
    paddingTop: `${spacing(2)}px`,
    background: palette.background.default
  }
});

export interface Styles {
  root: any;
  header: any;
  content: any;
}

export const useStyles = makeStyles(styles);
