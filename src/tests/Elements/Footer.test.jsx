import { render, screen } from "@testing-library/react";
import Footer from "../../Elements/Footer";
import { useAppContext } from "../../helpers/ContextApi";
import { createMockAppContext } from "../utils/mockAppContext";

jest.mock("../../helpers/ContextApi", () => ({
  useAppContext: jest.fn(),
}));

describe("Footer", () => {
  test("renders the translated footer text", () => {
    useAppContext.mockReturnValue(createMockAppContext());

    render(<Footer />);

    expect(screen.getByText("Developed by Pedro Vieira")).toBeInTheDocument();
  });
});
