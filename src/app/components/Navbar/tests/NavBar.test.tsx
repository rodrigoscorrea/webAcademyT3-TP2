import { screen, render } from "@testing-library/react";
import Navbar from "../Navbar";

describe("NavBar", ()=> {
    it("Deve renderizar corretamente os componentes da navbar", ()=>{
        render(
            <Navbar></Navbar>
        );
        expect(screen.getByRole("navbar")).toBeInTheDocument();
    });

    it("A navbar deve conter o link do início da aplicação", ()=>{
        render(
            <Navbar></Navbar>
        );
        expect(screen.getByText("Início")).toHaveTextContent("Início");
    });

    it("A navbar deve conter o link da lista de favoritos da aplicação", ()=>{
        render(
            <Navbar></Navbar>
        );
        expect(screen.getByText("Lista de Favoritos")).toHaveTextContent("Lista de Favoritos");
    });

    it("O botão de dropdown não deve estar visível, porém renderizado", ()=>{
        render(
            <Navbar></Navbar>
        );
        const botaoDropdown = screen.getByRole("button", {name: "Abrir menu"});
        expect(botaoDropdown).toBeInTheDocument();
        expect(botaoDropdown).toHaveAttribute("aria-expanded", "false");
        
    });
    
});