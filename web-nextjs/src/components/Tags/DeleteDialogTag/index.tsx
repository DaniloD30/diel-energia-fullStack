import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { memo, useState } from "react";
import { api } from "@/lib";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  handleClose: () => void;
  open: boolean;
  idTag: number | string;
}

function DeleteDialogTagC({ handleClose, open, idTag }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.delete(`tags/${idTag}`);
    } catch (error) {
    } finally {
      setIsLoading(false);
      handleClose();
      queryClient.refetchQueries({
        queryKey: ["getTags"],
      });
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Tag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The tag may be related to other tasks, are you sure you want to
            delete it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={isLoading} onClick={handleSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export const DeleteDialogTag = memo(DeleteDialogTagC);
