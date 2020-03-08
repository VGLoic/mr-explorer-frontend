import { makeStyles, Theme } from "@material-ui/core";

const styles = ({ spacing, palette }: Theme): Styles => ({
  paperScrollPaper: {
    minHeight: "500px"
  },
  circularProgress: {
    display: "flex",
    justifyContent: "flex-end"
  },
  projectItem: {
    padding: `${spacing(1)}px`
  },
  projectsWrapper: {
    marginTop: `${spacing(2)}px`
  }
});

export interface Styles {
  paperScrollPaper: any;
  circularProgress: any;
  projectsWrapper: any;
  projectItem: any;
}

export const useStyles = makeStyles(styles);
