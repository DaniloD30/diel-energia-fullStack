import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTags } from "@/hooks/useTags";
import { useEffect, useState, memo } from "react";
import { AlertColor, Box, Grid, debounce } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MultiSelect } from "../MultiSelect";
import { Tasks } from "@/interfaces/tasksInterface";
import Typography from "@mui/material/Typography";
import { api } from "@/lib";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { SnackbarComponent } from "@/components/SnackBar";
interface Props {
  handleClose: () => void;
  open: boolean;
  initialEdit?: any;
}
function ModalTaskC({ handleClose, open, initialEdit }: Props) {
  const { data: tags } = useTags();
  const [tagsSelected, setTagSelected] = useState<string[]>([]);
  const [values, setValues] = useState<Tasks>({
    title: initialEdit ? initialEdit.title : "",
    description: initialEdit ? initialEdit.description : "",
    dateHour: initialEdit ? initialEdit.dateHour : null,
    duration: initialEdit ? initialEdit.duration : null,
    tags: initialEdit ? initialEdit.tags : [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [severitySnackBar, setSeveritySnackBar] =
    useState<AlertColor>("success");
  const queryClient = useQueryClient();

  const handleSearchTag = debounce((value: string | string[]) => {
    setTagSelected(value as any);
    if (Array.isArray(value) && tags) {
      let newArr = value.map((item: string) => {
        const tag = tags.find((objeto) => objeto.id === item);
        return {
          id: item,
          title: tag ? tag.title : "",
        };
      });

      setValues((prevTask) => ({
        ...prevTask,
        tags: newArr,
      }));
    }
  }, 500);

  useEffect(() => {
    setTagSelected(initialEdit ? initialEdit.tags : []);
    setValues((prevTask) => ({
      ...prevTask,
      title: initialEdit ? initialEdit.title : "",
      description: initialEdit ? initialEdit.description : "",
      dateHour: initialEdit ? dayjs(initialEdit.start) : dayjs(new Date()),
      duration: initialEdit ? dayjs(initialEdit.end) : dayjs(new Date()),
      tags: initialEdit ? initialEdit.tags : [],
    }));
  }, [initialEdit]);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (initialEdit?.event_id) {
      try {
        let objData = {
          title: values.title,
          description: values.description,
          dateHour: values.dateHour?.toISOString(),
          duration: values.duration?.toISOString(),
          tags: values.tags,
        };

        await api.put(`tasks/${initialEdit?.event_id}`, objData);
      } catch (error) {
        setSeveritySnackBar("error");
      } finally {
        setOpenSnackBar(true);
        setIsLoading(false);
        handleClose();
        queryClient.refetchQueries({
          queryKey: ["getTasks"],
        });
        setValues({
          title: "",
          description: "",
          dateHour: null,
          duration: null,
          tags: [],
        });
        setTagSelected([]);
      }
    } else {
      try {
        let objData = {
          title: values.title,
          description: values.description,
          dateHour: values.dateHour?.toISOString(),
          duration: values.duration?.toISOString(),
          tags: values.tags,
        };
        await api.post("tasks ", objData);
      } catch (error) {
        setSeveritySnackBar("error");
      } finally {
        setOpenSnackBar(true);
        setIsLoading(false);
        handleClose();
        queryClient.refetchQueries({
          queryKey: ["getTasks"],
        });
        setValues({
          title: "",
          description: "",
          dateHour: null,
          duration: null,
          tags: [],
        });
        setTagSelected([]);
      }
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a task, please enter your details below.
          </DialogContentText>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                defaultValue={initialEdit?.title}
                label="Title"
                inputProps={{
                  maxLength: 250,
                }}
                onChange={(e) => {
                  setValues((prevTask) => ({
                    ...prevTask,
                    title: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                defaultValue={initialEdit?.description}
                inputProps={{
                  maxLength: 250,
                }}
                label="Description"
                onChange={(e) => {
                  setValues((prevTask) => ({
                    ...prevTask,
                    description: e.target.value,
                  }));
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom mb="5px" mt="10px">
                Data inicial
              </Typography>
              <DateTimePicker
                sx={{ width: "100%" }}
                defaultValue={dayjs(initialEdit?.start)}
                onChange={(newValue) => {
                  setValues((prevTask) => ({
                    ...prevTask,
                    dateHour: newValue,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom mb="5px" mt="10px">
                Duração
              </Typography>
              <DateTimePicker
                sx={{ width: "100%" }}
                // value={values.duration}
                minDate={values.dateHour}
                defaultValue={dayjs(initialEdit?.end)}
                onChange={(newValue) => {
                  setValues((prevTask) => ({
                    ...prevTask,
                    duration: newValue,
                  }));
                }}
              />
            </Grid>
          </Grid>
          <Box mt="20px">
            <MultiSelect
              tags={tags}
              tagsSelected={tagsSelected}
              setTagSelected={handleSearchTag}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={
              values.title === "" ||
              values.description === "" ||
              values.dateHour === null ||
              values.duration === null ||
              isLoading
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarComponent
        open={openSnackBar}
        handleClose={setOpenSnackBar}
        severity={severitySnackBar}
      />
    </div>
  );
}
export const ModalTask = memo(ModalTaskC);
