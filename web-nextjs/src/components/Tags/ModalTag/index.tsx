import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { memo, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { api } from "@/lib";
import { useQueryClient } from "@tanstack/react-query";
import { Tags } from "@/interfaces/tagsInterface";

interface Props {
  handleClose: () => void;
  open: boolean;
  initialEdit?: Tags;
}
function ModalTagC({ handleClose, open, initialEdit }: Props) {
  const [values, setValues] = useState<Tags>({
    title: initialEdit ? initialEdit.title : "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setValues((prevTask) => ({
      ...prevTask,
      title: initialEdit ? initialEdit.title : "",
    }));
  }, [initialEdit]);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (initialEdit?.id) {
      try {
        let objData = {
          title: values.title,
          tasks: [],
        };

        await api.put(`tags/${initialEdit?.id}`, objData);
      } catch (error) {
      
      } finally {
        setIsLoading(false);
        handleClose();
        queryClient.refetchQueries({
          queryKey: ["getTags"],
        });
        setValues({
          title: "",
        });
     
      }
    } else {
      try {
        let objData = {
          title: values.title,
        };
        await api.post("tags", objData);
      } catch (error) {
    
      } finally {
        setIsLoading(false);
        handleClose();
        queryClient.refetchQueries({
          queryKey: ["getTags"],
        });
        setValues({
          title: "",
        });
    
      }
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Tags</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a tag, please enter the data below.
          </DialogContentText>
          <Grid container spacing={4} mt="10px">
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={values.title === "" || isLoading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export const ModalTag = memo(ModalTagC);
