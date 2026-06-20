import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { backendApi } from "../../services/api";

export default function Dashboard() {

  const { data: produtos = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await backendApi.get("/products");
      return response.data;
    },
  });

  if (isLoading) {
    return <h2>Carregando produtos...</h2>;
  }

  if (error) {
    return <h2>Erro ao carregar produtos.</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>Dashboard</h1>

      <Link to="/create">
        <button>
          Criar Novo Produto
        </button>
      </Link>

      <h3>
        Quantidade de Produtos: {produtos.length}
      </h3>

      {produtos.length === 0 && (
        <p>Nenhum produto cadastrado.</p>
      )}

      {produtos.map((produto) => (
        <div
          key={produto.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <Link to={`/product/${produto.id}`}>
            <h3>{produto.name}</h3>
          </Link>

          <p>Preço: R$ {produto.price}</p>

          <p>Estoque: {produto.stock}</p>
        </div>
      ))}
    </div>
  );
}