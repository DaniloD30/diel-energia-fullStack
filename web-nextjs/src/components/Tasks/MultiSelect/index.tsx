import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Tags } from "../../../interfaces/tagsInterface";
import { memo } from "react";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  tags?: Tags[];
  tagsSelected: string[];
  setTagSelected: (titlePost: string | string[]) => void;
}
function MultiSelectC({ tags, setTagSelected, tagsSelected }: Props) {
  const searchId = (id: any) => {
    if (tags) {
      if (id.id) {
        return tags.find((objeto) => objeto.id === id.id);
      }
      return tags.find((objeto) => objeto.id === id);
    }
  };
  const handleChange = (event: SelectChangeEvent<typeof tagsSelected>) => {
    const {
      target: { value },
    } = event;

    setTagSelected(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={tagsSelected}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={searchId(value)?.title} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tags?.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              {tag.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
export const MultiSelect = memo(MultiSelectC);
