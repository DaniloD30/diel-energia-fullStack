import { Dispatch, SetStateAction, memo } from "react";
import { Button, Grid } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import type { ProcessedEvent } from "@aldabil/react-scheduler/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  tasks: any;
  handleClickOpen: () => void;
  handleClickOpenDelete: () => void;
  setEditTask: Dispatch<SetStateAction<any>>;
  setDeleteTask: Dispatch<SetStateAction<string>>;
  holidays: any;
}

function SchedulerReactC({
  tasks,
  handleClickOpen,
  handleClickOpenDelete,
  setEditTask,
  setDeleteTask,
  holidays,
}: Props) {
  const handleOpenModalEdit = (event: ProcessedEvent) => {
    setEditTask(event);
    handleClickOpen();
  };

  const handleOpenModalDelete = (event: ProcessedEvent) => {
    setDeleteTask(event.event_id as string);
    handleClickOpenDelete();
  };
  return (
    <Scheduler
      view="day"
      editable={false}
      deletable={false}
      viewerExtraComponent={(fields, event) => {
        return (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                disabled={event.countryCode}
                endIcon={<EditIcon />}
                onClick={() => handleOpenModalEdit(event)}
              ></Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                disabled={event.countryCode}
                endIcon={<DeleteIcon />}
                onClick={() => handleOpenModalDelete(event)}
              ></Button>
            </Grid>
          </Grid>
        );
      }}
      events={tasks.concat(holidays)}
    />
  );
}

export const SchedulerReact = memo(SchedulerReactC);
