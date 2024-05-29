import ItemFavorito from "../ItemFavorito";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockProdutos } from "@/app/mocks/produtos";
import {
  FavoritosProvider,
  useProdutoFavorito,
} from "../../../State/FavoritosProvider";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";

jest.mock("../../../State/FavoritosProvider", () => ({
    ...jest.requireActual("../../../State/FavoritosProvider"),
    useProdutoFavorito: jest.fn(),
  }));

describe("ItemFavorito", ()=>{
    it("Deve renderizar as informações do item favorito", ()=>{
        const useProdutoFavoritoMock = useProdutoFavorito as jest.Mock;
        useProdutoFavoritoMock.mockReturnValue(false);
        
        const produtoMockado = mockProdutos[0];
        const precoComDesconto = calculaValorComPorcentagemDeDesconto(
            Number(produtoMockado.preco),
            produtoMockado.desconto
        );

        render(
            <ItemFavorito key={produtoMockado.id} itemFavorito={produtoMockado} setFavoritos={()=>{}}></ItemFavorito>
        );

        expect(screen.getByText(`${produtoMockado.descricao}`)).toBeInTheDocument();
        expect(screen.getByText(`${produtoMockado.desconto}%`)).toBeInTheDocument();
        expect(screen.getByText(`${produtoMockado.nome}`)).toBeInTheDocument();
        expect(screen.getByText(`R$ ${calculaValorComPorcentagemDeDesconto(Number(produtoMockado.preco), 15)}.00`)).toBeInTheDocument();
        expect(screen.getByText('Remover')).toBeInTheDocument();
    });

    it("Deve ser possível clicar no botão de remover", async ()=>{
        const setFavoritos = jest.fn();
        const useProdutoFavoritoMock = useProdutoFavorito as jest.Mock;
        useProdutoFavoritoMock.mockReturnValue(false);

        const produtoMockado = mockProdutos[0];
        render(
            <ItemFavorito key={produtoMockado.id} itemFavorito={produtoMockado} setFavoritos={setFavoritos}></ItemFavorito>
        )

        const botao = screen.getByRole("button", {
            name: /Remover/i,
        });

        await userEvent.click(botao);

        expect(setFavoritos).toHaveBeenCalledTimes(1);
    })
});


