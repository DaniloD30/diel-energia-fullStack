import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircle from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Dispatch, SetStateAction, memo } from "react";
import { Tags } from "@/interfaces/tagsInterface";

interface Props {
  tags: Tags[];
  handleClickOpen: () => void;
  handleClickOpenDelete: () => void;
  setEditTag: Dispatch<SetStateAction<any>>;
  setDeleteTag: Dispatch<SetStateAction<string>>;
}
function TableTagC({
  tags,
  handleClickOpen,
  handleClickOpenDelete,
  setEditTag,
  setDeleteTag,
}: Props) {
  const handleOpenModalEdit = (tag: Tags) => {
    setEditTag(tag);
    handleClickOpen();
  };
  const handleOpenModalDelete = (tag: Tags) => {
    setDeleteTag(tag.id ? tag.id : "");
    handleClickOpenDelete();
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">New</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" sx={{ cursor: "pointer" }}>
                {row.title}
              </TableCell>
              <TableCell
                align="right"
                sx={{ cursor: "pointer" }}
                onClick={() => handleOpenModalEdit(row)}
              >
                <EditIcon />
              </TableCell>
              <TableCell
                align="right"
                onClick={() => handleOpenModalDelete(row)}
                sx={{ cursor: "pointer" }}
              >
                <DeleteIcon />
              </TableCell>
              <TableCell
                align="right"
                sx={{ cursor: "pointer" }}
                onClick={() => handleClickOpen()}
              >
                <AddCircle />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export const TableTag = memo(TableTagC);
