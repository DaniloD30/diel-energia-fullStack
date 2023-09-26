import { Box, Button, Grid, debounce } from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import { MultiSelect } from "./MultiSelect";
import { ModalTask } from "./Modal";
import { SchedulerReact } from "./Scheduler/SchedulerReact";
import { useTasks } from "@/hooks/useTasks";
import { useState } from "react";
import { InputSearch } from "./InputSearch";
import { useTags } from "../../hooks/useTags";
import { DeleteDialog } from "./DeleteDialog";

export const TasksContainer = () => {
  const [search, setSearch] = useState("");
  const [tagsSelected, setTagSelected] = useState<string[]>([]);
  const [editTask, setEditTask] = useState<any>();
  const [idTaskDelete, setTaskDeleteId] = useState<string>("");
  const { data: tasks, isLoading } = useTasks(search, tagsSelected);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { data: tags } = useTags();
  const handleSearch = debounce((value) => {
    setSearch(value);
  }, 1000);

  const handleSearchTag = debounce((value) => {
    setTagSelected(value);
  }, 500);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleClose = () => {
    setEditTask("");
    setOpen(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <>
      <Box>
        <Grid container spacing={5}>
          <Grid item sm={6}>
            <InputSearch handleSearch={handleSearch} />
          </Grid>
          <Grid item sm={6}>
            <MultiSelect
              tags={tags}
              tagsSelected={tagsSelected}
              setTagSelected={handleSearchTag}
            />
          </Grid>
        </Grid>
        <Grid container mt={4}>
          <Grid item sm={4}>
            <Button
              variant="outlined"
              fullWidth
              endIcon={<AddCircle />}
              onClick={handleClickOpen}
            >
              Add a new task
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mt="30px">
        {/* <ScheduleContainer /> */}
        {!isLoading && tasks && tasks?.length > 0 ? (
          <SchedulerReact
            tasks={tasks}
            handleClickOpenDelete={handleClickOpenDelete}
            handleClickOpen={handleClickOpen}
            setEditTask={setEditTask}
            setDeleteTask={setTaskDeleteId}
          />
        ) : null}
      </Box>
      <ModalTask handleClose={handleClose} open={open} initialEdit={editTask} />
      <DeleteDialog
        handleClose={handleCloseDelete}
        open={openDelete}
        idTask={idTaskDelete}
      />
    </>
  );
};
