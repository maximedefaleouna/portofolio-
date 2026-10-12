import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("App", () => {
  it("renders portfolio header with sections", () => {
    render(<App />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getAllByText("Projets").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Parcours").length).toBeGreaterThan(0);
    expect(screen.getByText("Maxime Defaleouna")).toBeInTheDocument();
  });
});
