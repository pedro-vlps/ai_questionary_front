import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LanguageSelector from "../../Elements/LanguageSelector";
import { useAppContext } from "../../helpers/ContextApi";
import { createMockAppContext } from "../utils/mockAppContext";

jest.mock("../../helpers/ContextApi", () => ({
  useAppContext: jest.fn(),
}));

describe("LanguageSelector", () => {
  test("renders available languages and updates the selected language", async () => {
    const setLanguage = jest.fn();
    useAppContext.mockReturnValue(
      createMockAppContext({
        language: "es",
        setLanguage,
      }),
    );

    render(<LanguageSelector />);

    expect(screen.getByLabelText("Idioma")).toHaveValue("es");
    expect(screen.getByRole("option", { name: "English" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Español" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Portugués" })).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByLabelText("Idioma"), "pt");

    expect(setLanguage).toHaveBeenCalledWith("pt");
  });
});
