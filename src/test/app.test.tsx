import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("App", () => {
  it("renders portfolio with loopbin style navigation and sections", () => {
    render(<App />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText(/Bienvenue sur Loopbin/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Mes sujets/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Mes sujets en cours/i)).toBeInTheDocument();
    expect(screen.getByText(/Mes derniers projets/i)).toBeInTheDocument();
    expect(screen.getByText("Maxime Defaleouna")).toBeInTheDocument();
  });
});
