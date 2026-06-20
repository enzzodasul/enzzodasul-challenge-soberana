import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { backendApi } from "../../services/api";

import "./Dashboard.css";

export default function Dashboard() {

  const {
    data: produtos = [],
    isLoading,
    error
  } = useQuery({

    queryKey: ["products"],

    queryFn: async () => {

      // busca todos os produtos cadastrados no backend
      const resposta = await backendApi.get("/products");

      return resposta.data;
    },
  });

  // loading da página
  if (isLoading) {
    return <h2>Carregando produtos...</h2>;
  }

  // erro da requisição
  if (error) {
    return <h2>Erro ao carregar produtos.</h2>;
  }

  return (
    <div className="dashboard">

      <h1>Dashboard de Produtos</h1>

      {/* botão para cadastrar novo produto */}
      <Link to="/create" className="create-button">
        Criar Novo Produto
      </Link>

      <h3 className="mostrador-quantidade-produtos">
        Quantidade de Produtos: {produtos.length}
      </h3>

      {/* mensagem quando não existir produto */}
      {produtos.length === 0 && (
        <p>Nenhum produto cadastrado.</p>
      )}

      <div className="product-list">

        {produtos.map((produto) => (

          <div
            key={produto.id}
            className="product-card"
          >

            {/* nome do produto clicável */}
            <Link className="nome-do-produto" to={`/product/${produto.id}`}>
              <h3>{produto.name}</h3>
            </Link>

            <p className="mostrador-preco">
              Preço: R$ {produto.price}
            </p>

            <p className="mostrador-estoque">
              Estoque: {produto.stock}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}