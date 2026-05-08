import { render, screen, waitFor } from "@testing-library/react";
import AnsweredQuestions from "../../pages/AnsweredQuestions";
import { useAppContext } from "../../helpers/ContextApi";
import { get } from "../../helpers/FecthApi.jsx";
import { createMockAppContext } from "../utils/mockAppContext";

jest.mock("../../helpers/ContextApi", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("../../helpers/FecthApi.jsx", () => ({
  get: jest.fn(),
}));

describe("AnsweredQuestions page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows an error immediately when there is no authenticated user", async () => {
    useAppContext.mockReturnValue(
      createMockAppContext({
        getCurrentUserId: () => null,
      }),
    );

    render(<AnsweredQuestions />);

    expect(await screen.findByText("Unable to identify the authenticated user.")).toBeInTheDocument();
    expect(get).not.toHaveBeenCalled();
  });

  test("shows the empty state when the user has no saved answers", async () => {
    useAppContext.mockReturnValue(createMockAppContext());
    get.mockResolvedValue({ data: [] });

    render(<AnsweredQuestions />);

    expect(await screen.findByText("No answers found")).toBeInTheDocument();
    expect(screen.getByText("As soon as you answer a question, it will appear here.")).toBeInTheDocument();
  });

  test("renders the answered questions table with formatted answer labels", async () => {
    useAppContext.mockReturnValue(
      createMockAppContext({
        formatDateTime: () => "10/05/2026 09:00",
      }),
    );
    get.mockResolvedValue({
      data: [
        {
          id: 1,
          question: "Which bone is in the thigh?",
          topic: "Locomotor",
          subject: "Anatomy",
          answer_a: "Tibia",
          answer_b: "Femur",
          answer_c: "Ulna",
          answer_d: "Radius",
          correct_answer: "B",
          user_answer: "A",
          answered_at: "2026-05-10T12:00:00Z",
        },
      ],
    });

    render(<AnsweredQuestions />);

    await waitFor(() => {
      expect(get).toHaveBeenCalledWith(
        "question-answers/latest-answers?user_id=42",
      );
    });
    expect(await screen.findByText("Which bone is in the thigh?")).toBeInTheDocument();
    expect(screen.getByText("A) Tibia")).toBeInTheDocument();
    expect(screen.getByText("B) Femur")).toBeInTheDocument();
    expect(screen.getByText("10/05/2026 09:00")).toBeInTheDocument();
  });

  test("shows a fallback error message when the load request fails", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    useAppContext.mockReturnValue(createMockAppContext());
    get.mockRejectedValue({});

    render(<AnsweredQuestions />);

    expect(await screen.findByText("Unable to load your answers right now.")).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalled();
  });

  test("falls back to the raw answer letter when the option label is unavailable", async () => {
    useAppContext.mockReturnValue(createMockAppContext());
    get.mockResolvedValue({
      data: [
        {
          id: 2,
          question: "Question with unknown answer",
          topic: "Locomotor",
          subject: "Anatomy",
          answer_a: "Tibia",
          answer_b: "Femur",
          answer_c: "Ulna",
          answer_d: "Radius",
          correct_answer: "Z",
          user_answer: "",
          answered_at: "2026-05-10T12:00:00Z",
        },
      ],
    });

    render(<AnsweredQuestions />);

    expect(await screen.findByText("Z")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });
});
