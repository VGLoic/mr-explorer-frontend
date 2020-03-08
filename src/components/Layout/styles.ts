import { makeStyles, Theme } from "@material-ui/core";

const styles = ({ spacing, palette }: Theme): Styles => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    height: `56px`,
    background: palette.background.paper,
    paddingLeft: `${spacing(2)}px`,
    paddingRight: `${spacing(2)}px`
  },
  content: {
    flex: 1,
    minHeight: `calc(100vh - ${spacing(7)}px)`,
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
