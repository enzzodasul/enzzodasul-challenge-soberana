import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { backendApi } from "../../services/api";

export default function CreateProduct() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  async function onSubmit(data) {

    try {

      await backendApi.post("/products", {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock)
      });

      alert("Produto criado com sucesso!");

      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Erro ao criar produto");

    }
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>Criar Produto</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label>Nome</label>
          <br />

          <input
            {...register("name", {
              required: "Nome obrigatório"
            })}
          />

          <p>{errors.name?.message}</p>
        </div>

        <br />

        <div>
          <label>Preço</label>
          <br />

          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Preço obrigatório",
              min: {
                value: 0.01,
                message: "Preço deve ser maior que zero"
              }
            })}
          />

          <p>{errors.price?.message}</p>
        </div>

        <br />

        <div>
          <label>Quantidade</label>
          <br />

          <input
            type="number"
            {...register("stock", {
              required: "Quantidade obrigatória",
              min: {
                value: 0,
                message: "Quantidade inválida"
              }
            })}
          />

          <p>{errors.stock?.message}</p>
        </div>

        <br />

        <div>
          <label>Descrição</label>
          <br />

          <textarea
            {...register("description")}
          />
        </div>

        <br />

        <button type="submit">
          Salvar Produto
        </button>

      </form>

    </div>
  );
}