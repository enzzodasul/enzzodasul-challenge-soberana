import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { backendApi } from "../../services/api";







export default function ProductDetails() {

  // pega o id que vem pela url
  const { id } = useParams();

  // usado para voltar para outra tela depois
  const navigate = useNavigate();

  // serve para atualizar os dados depois de alterar algo
  const queryClient = useQueryClient();

  const {
    data: produto,
    isLoading,
    error
  } = useQuery({
    queryKey: ["product", id],

    queryFn: async () => {

      // busca o produto pelo id
      const resposta = await backendApi.get(`/products/${id}`);

      return resposta.data;
    },
  });

  async function mudarEstoque(valor) {

    try {

      // soma ou diminui do estoque atual
      const estoqueAtualizado = produto.stock + valor;

      // não deixa ficar negativo
      if (estoqueAtualizado < 0) {
        alert("O estoque não pode ficar negativo");
        return;
      }

      // atualiza no banco
      await backendApi.put(`/products/${id}`, {
        name: produto.name,
        description: produto.description,
        price: produto.price,
        stock: estoqueAtualizado
      });

      // faz a tela buscar os dados novamente
      queryClient.invalidateQueries({
        queryKey: ["product", id]
      });

    } catch (erro) {

      console.error(erro);

      alert("Erro ao alterar estoque");

    }
  }

  async function excluirProduto() {

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) {
      return;
    }

    try {

      // apaga o produto
      await backendApi.delete(`/products/${id}`);

      alert("Produto removido com sucesso");

      // volta para dashboard
      navigate("/");

    } catch (erro) {

      console.error(erro);

      alert("Erro ao excluir produto");

    }
  }

  // enquanto carrega
  if (isLoading) {
    return <h2>Carregando...</h2>;
  }

  // caso dê erro na busca
  if (error) {
    return <h2>Erro ao buscar produto.</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>{produto.name}</h1>

      <p>
        <strong>Preço:</strong> R$ {produto.price}
      </p>

      <div style={{ marginTop: "20px" }}>

        {/* tira 1 do estoque */}
        <button onClick={() => mudarEstoque(-1)}>
          -
        </button>

        <span
          style={{
            marginLeft: "15px",
            marginRight: "15px",
            fontWeight: "bold"
          }}
        >
          Estoque: {produto.stock}
        </span>

        {/* adiciona 1 no estoque */}
        <button onClick={() => mudarEstoque(1)}>
          +
        </button>

      </div>

      <p style={{ marginTop: "20px" }}>
        <strong>Descrição:</strong> {produto.description}
      </p>

      <br />

      <Link to={`/edit/${produto.id}`}>
        <button>
          Editar Produto
        </button>
      </Link>

      <button
        onClick={excluirProduto}
        style={{ marginLeft: "10px" }}
      >
        Excluir Produto
      </button>

    </div>
  );
}