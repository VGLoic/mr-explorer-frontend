import React from "react";
// UI Components
import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  IconButton,
  SvgIcon,
  Tooltip
} from "@material-ui/core";
import { mdiGitlab } from "@mdi/js";
// Styles
import { useStyles } from "./styles";
// Types
import { MergeRequest } from "../controllers/mergeRequest.query";

interface MergeRequestProps {
  mergeRequest: MergeRequest;
}
const MergeRequestCard = ({ mergeRequest }: MergeRequestProps) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} key={mergeRequest.id}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            className={classes.firstRow}
          >
            <Typography>{mergeRequest.title}</Typography>
            <Box>
              <Typography variant="subtitle2">Approvals:</Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle2">
                !{mergeRequest.iid} - opened 1 day ago by{" "}
                {mergeRequest.author.name}
              </Typography>
              <Tooltip title="See on Gitlab">
                <IconButton
                  href={mergeRequest.webUrl}
                  className={classes.redirectIcon}
                >
                  <SvgIcon>
                    <path d={mdiGitlab} />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Typography variant="subtitle2">
                Reviews: {mergeRequest.userNotesCount}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MergeRequestCard;
