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
  Tooltip,
  Avatar
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
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
            alignItems="center"
          >
            <Typography>
              <strong>{mergeRequest.title}</strong>
            </Typography>
            <Box display="flex">
              <Typography variant="subtitle2">Approvals:</Typography>
              <AvatarGroup className={classes.avatarGroup}>
                {mergeRequest.approvedBy.map(user => (
                  <Tooltip key={user.id} title={user.name}>
                    <Avatar src={user.avatarUrl} className={classes.avatar} />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
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
