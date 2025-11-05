import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

describe("Header Component", () => {
  it("deve renderizar o header corretamente", () => {
    render(<Header />);

    // Verifica se os links de navegação estão presentes
    expect(screen.getByText("JOIN THE UNIVERSE")).toBeInTheDocument();
    expect(screen.getByText("EXPLORE")).toBeInTheDocument();
    expect(screen.getByText("SOUND")).toBeInTheDocument();
    expect(screen.getByText("+CONNECT")).toBeInTheDocument();
  });

  it("deve chamar onHoverSound quando passar o mouse em um item", () => {
    const mockHoverSound = jest.fn();
    render(<Header onHoverSound={mockHoverSound} />);

    const firstNavItem = screen.getByText("JOIN THE UNIVERSE");
    const listItem = firstNavItem.closest("li");

    if (listItem) {
      // Simula hover usando fireEvent
      fireEvent.mouseEnter(listItem);

      expect(mockHoverSound).toHaveBeenCalledTimes(1);
    }
  });
});
