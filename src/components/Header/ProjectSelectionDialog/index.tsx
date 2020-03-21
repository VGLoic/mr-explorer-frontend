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
  Grid
} from "@material-ui/core";
// Components
import ProjectList from "./ProjectList";
// Controllers
import { useProjectSelectionDialog } from "./controllers/useProjectSelectionDialog";
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
    onLoadMore,
    called,
    loading,
    data,
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
              autoComplete="off"
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
          <ProjectList
            called={called && Boolean(data)}
            loading={loading}
            hasNextPage={Boolean(data?.searchProjects.pageInfo.hasNextPage)}
            entries={data?.searchProjects.edges || []}
            onLoadMore={onLoadMore}
            selectProject={selectProject}
            selectedProjectId={selectedProjectId}
          />
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
