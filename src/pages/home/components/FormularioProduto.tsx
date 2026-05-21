import { useState } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import Detalhes from "./components/Detalhes";
import { useProdutos } from "../../hooks/useProdutos";
import type { Produto } from "../../types/Produto";

function FormularioProduto() {
  const [form, setForm] = useState<Produto>({ id: 0, nome: "", valor: 0 });
  const { produtos, loading, erro, cadastrar, recarregar } = useProdutos();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "valor" ? parseFloat(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await cadastrar(form);
    setForm({ nome: "", valor: 0 });
    await recarregar();
  }

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  return (
    <>
      <div className="bg-slate-300 rounded m-5 flex flex-col p-5">
        <form name="CadastrarProduto">
          <Input
            type="text"
            name="nome"
            label="Nome do produto"
            placeholder="Nome do produto"
            onChange={handleChange}
          />
          <Input
            type="number"
            name="valor"
            label="Valor do produto"
            placeholder="Valor do produto"
            onChange={handleChange}
          />
          <Button value="Cadastrar" onClick={handleSubmit} />
        </form>
      </div>

      <div className="bg-slate-300 rounded m-5 flex flex-col p-5">
        <Detalhes produtos={produtos} />
      </div>
    </>
  );
}

export default FormularioProduto;
