import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("App", () => {
  it("renders portfolio with loopbin style navigation (only projets & about)", () => {
    render(<App />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("./projets")).toBeInTheDocument();
    expect(screen.getByText("./about")).toBeInTheDocument();
    expect(screen.queryByText("./articles")).not.toBeInTheDocument();

    expect(screen.getByText(/Bienvenue sur Loopbin/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Mes sujets/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Mes sujets en cours/i)).toBeInTheDocument();
    expect(screen.getByText(/Mes derniers projets/i)).toBeInTheDocument();
    expect(screen.getByText(/À propos & Parcours/i)).toBeInTheDocument();
    expect(screen.getByText("Maxime Defaleouna")).toBeInTheDocument();
  });

  it("toggles light and dark mode", () => {
    render(<App />);
    const themeBtn = screen.getByLabelText(/Basculer entre mode clair et mode sombre/i);
    expect(themeBtn).toBeInTheDocument();

    // Toggle theme
    fireEvent.click(themeBtn);
    expect(
      document.documentElement.classList.contains("light") ||
        document.documentElement.classList.contains("dark"),
    ).toBe(true);
  });
});
