import React from "react";

const mockRender = jest.fn();
const mockCreateRoot = jest.fn(() => ({
  render: mockRender,
}));

jest.mock("react-dom/client", () => ({
  __esModule: true,
  default: {
    createRoot: mockCreateRoot,
  },
  createRoot: mockCreateRoot,
}));

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
}), { virtual: true });

jest.mock("../App", () => () => <div data-testid="app-shell">app</div>);

describe("index.js", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateRoot.mockReturnValue({
      render: mockRender,
    });
    document.body.innerHTML = '<div id="root"></div>';
  });

  test("mounts the app into the root element", () => {
    jest.isolateModules(() => {
      require("../index");
    });

    expect(mockCreateRoot).toHaveBeenCalledWith(document.getElementById("root"));
    expect(mockRender).toHaveBeenCalledTimes(1);

    const renderedTree = mockRender.mock.calls[0][0];
    expect(renderedTree.type).toBe(React.StrictMode);
  });
});
