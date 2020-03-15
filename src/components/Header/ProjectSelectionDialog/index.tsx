import React from "react";
import classnames from "classnames";
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
import { useProjectSelectionDialog } from "./controllers/useProjectSelectionDialog";
import { Project } from "./controllers/searchProjects.query";
// Styles
import { useStyles } from "./styles";

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
    selectProject,
    selectedProjectId,
    onClose,
    confirm
  } = useProjectSelectionDialog(toggleDialog);

  const classes = useStyles();

  return (
    <Dialog
      classes={{ paperScrollPaper: classes.paperScrollPaper }}
      open={open}
      onClose={onClose}
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
              <Typography variant="body2" color="textSecondary" component="p">
                No project has been found...
              </Typography>
            ) : (
              projects.map((project: Project) => (
                <Grid
                  item
                  xs={12}
                  key={project.id}
                  onClick={(): void => selectProject(project.id)}
                >
                  <Card
                    className={classnames({
                      [classes.selectedCard]: project.id === selectedProjectId
                    })}
                  >
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={confirm} disabled={!Boolean(selectedProjectId)}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectSelectionDialog;
