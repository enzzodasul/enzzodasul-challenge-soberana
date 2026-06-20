import { useParams, Link, useNavigate } from "react-router-dom";

import {useQuery } from "@tanstack/react-query";

import { backendApi } from "../../services/api";


export default function ProductDetails() {

  const {id} = useParams();
  const navigate = useNavigate();

  const {data: produto, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await backendApi.get('/products/${id}');
      return response.data;
    },
  });



async function deletarProduto() {

    const confirmar = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmar) return;

    try {

      await backendApi.delete(`/products/${id}`);

      alert("Produto excluído!");

      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Erro ao excluir produto");

    }
  }

  if (isLoading) {
    return <h2>Carregando produto...</h2>;
  }

  if (error) {
    return <h2>Erro ao carregar produto.</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>{produto.name}</h1>

      <p>
        <strong>Preço:</strong> R$ {produto.price}
      </p>

      <p>
        <strong>Estoque:</strong> {produto.stock}
      </p>

      <p>
        <strong>Descrição:</strong> {produto.description}
      </p>

      <br />

      <Link to={`/edit/${produto.id}`}>
        <button>
          Atualizar Produto
        </button>
      </Link>

      <button
        onClick={deletarProduto}
        style={{ marginLeft: "10px" }}
      >
        Excluir Produto
      </button>

    </div>
  );
}