import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import { TextField, Button, DialogActions, Grid } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import type {
  ProcessedEvent,
  SchedulerHelpers,
} from "@aldabil/react-scheduler/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Holidays } from "@/interfaces/tasksInterface";

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}
const CustomEditor = ({ scheduler }: CustomEditorProps) => {
  const event = scheduler.edited;

  // Make your own form/state
  const [state, setState] = useState({
    title: event?.title || "",
    description: event?.description || "",
  });
  const [error, setError] = useState("");

  const handleChange = (value: string, name: string) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async () => {
    // Your own validation
    if (state.title.length < 3) {
      return setError("Min 3 letters");
    }

    try {
      scheduler.loading(true);

      /**Simulate remote data saving */
      const added_updated_event = (await new Promise((res) => {
        /**
         * Make sure the event have 4 mandatory fields
         * event_id: string|number
         * title: string
         * start: Date|string
         * end: Date|string
         */
        setTimeout(() => {
          res({
            event_id: event?.event_id || Math.random(),
            title: state.title,
            start: scheduler.state.start.value,
            end: scheduler.state.end.value,
            description: state.description,
          });
        }, 3000);
      })) as ProcessedEvent;

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };
  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <p>Load your custom form/fields</p>
        <TextField
          label="Title"
          value={state.title}
          onChange={(e) => handleChange(e.target.value, "title")}
          error={!!error}
          helperText={error}
          fullWidth
        />
        <TextField
          label="Description"
          value={state.description}
          onChange={(e) => handleChange(e.target.value, "description")}
          fullWidth
        />
      </div>
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </div>
  );
};
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
  const [tagsSelected, setTagSelected] = useState(tasks.concat(holidays));

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
      customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
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
      events={tagsSelected}
    />
  );
}

export const SchedulerReact = memo(SchedulerReactC);
