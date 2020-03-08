import React from "react";
// UI Components
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea
} from "@material-ui/core";
// Controllers
import {
  useProjectSelectionDialog,
  UseProjectSelectionDialog
} from "./controllers/useProjectSelectionDialog";
import { Project } from "../controllers/searchProjectsQuery";
// Styles
import { useStyles, Styles } from "./styles";

type ProjectSelectionDialogProps = {
  open: boolean;
  toggleDialog: () => void;
};
const ProjectSelectionDialog = ({
  open,
  toggleDialog
}: ProjectSelectionDialogProps) => {
  const {
    triggerSearch,
    called,
    loading,
    projects,
    selectProject
  }: UseProjectSelectionDialog = useProjectSelectionDialog();

  const classes: Styles = useStyles();

  return (
    <Dialog
      classes={{ paperScrollPaper: classes.paperScrollPaper }}
      open={open}
      onClose={toggleDialog}
    >
      <DialogTitle>Choose a project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Find and choose the project that you want to work on
        </DialogContentText>
        <Grid container alignItems="center">
          <Grid item xs={9}>
            <TextField
              autoFocus
              label="Project name"
              name="project-name-search"
              margin="dense"
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                triggerSearch(e.target.value)
              }
            />
          </Grid>
          <Grid item xs={3} className={classes.circularProgress}>
            {loading && <CircularProgress size="30px" />}
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          spacing={2}
          className={classes.projectsWrapper}
        >
          {called &&
            projects &&
            (projects.length === 0 ? (
              <Typography>No project has been found...</Typography>
            ) : (
              projects.map((project: Project) => (
                <Grid
                  item
                  xs={12}
                  key={project.id}
                  onClick={(): void => selectProject(project.id)}
                >
                  <Card>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h5">
                          {project.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Full path: {project.pathWithNamespace}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={toggleDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={toggleDialog} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectSelectionDialog;
