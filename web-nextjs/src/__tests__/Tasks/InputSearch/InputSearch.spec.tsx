import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InputSearch } from "@/components/Tasks/InputSearch";
const queryClient = new QueryClient();
describe("InputSearch", () => {
  it("Render InputSearch", () => {
    const handleSearch = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <InputSearch handleSearch={handleSearch} />
      </QueryClientProvider>
    );

    const textField = screen.getByRole("textbox", {
      name: /search by task title/i,
    });
    fireEvent.change(textField, { target: { value: "test" } });
  });
});
