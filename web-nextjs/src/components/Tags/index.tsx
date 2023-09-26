import { TableTag } from "./TableTag";
import { useTags } from "@/hooks/useTags";
import { useState } from "react";
import { ModalTag } from "./ModalTag";
import { DeleteDialog } from "../Tasks/DeleteDialog";
export const Tags = () => {
  const { data: tags, isLoading } = useTags();
  const [editTag, setEditTag] = useState<any>();
  const [idTagDelete, setTagDeleteId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleClose = () => {
    setEditTag("");
    setOpen(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <>
      <ModalTag handleClose={handleClose} open={open} initialEdit={editTag} />
      <DeleteDialog
        handleClose={handleCloseDelete}
        open={openDelete}
        idTask={idTagDelete}
      />
      {tags && !isLoading ? (
        <TableTag
          tags={tags}
          handleClickOpen={handleClickOpen}
          handleClickOpenDelete={handleClickOpenDelete}
          setEditTag={setEditTag}
          setDeleteTag={setTagDeleteId}
        />
      ) : null}
    </>
  );
};
