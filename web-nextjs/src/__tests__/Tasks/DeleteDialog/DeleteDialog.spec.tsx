import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DeleteDialog } from "@/components/Tasks/DeleteDialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
describe("DeleteDialog", () => {
  it("Render DeleteDialog", () => {
    // handleClose: () => void;
    // open: boolean;
    // idTask: number | string;
    const handleClose = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <DeleteDialog handleClose={handleClose} open={true} idTask="12313" />
      </QueryClientProvider>
    );
   
    const title = screen.getByRole("heading", {
      name: /task/i,
    });
    const description = screen.getByText(
      /the task may be related to other tags, are you sure you want to delete it\?/i
    );
    const buttonCancel = screen.getByRole("button", {
      name: /cancel/i,
    });
    const buttonSave = screen.getByRole("button", {
      name: /save/i,
    });
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(buttonCancel).toBeInTheDocument();
    expect(buttonSave).toBeInTheDocument();
  });
});
