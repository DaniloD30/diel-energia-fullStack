import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { memo, useEffect, useState } from "react";
import { api } from "@/lib";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  handleClose: () => void;
  open: boolean;
  idTask: number | string;
}
function DeleteDialogC({  handleClose, open, idTask }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.delete(`tasks/${idTask}`);
    } catch (error) {
    
    } finally {
      setIsLoading(false);
      handleClose();
      queryClient.refetchQueries({
        queryKey: ["getTasks"],
      });
   
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
          The Task may be related to other tags, are you sure you want to delete it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={isLoading} onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export const DeleteDialog = memo(DeleteDialogC);