import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { memo } from 'react';
interface Props {
  handleSearch: (titlePost: string) => void;
}
function InputSearchC({ handleSearch }: Props) {

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search by task title"
        variant="outlined"
        fullWidth
        inputProps={{
          maxLength: 250,
        }}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
export const InputSearch = memo(InputSearchC);