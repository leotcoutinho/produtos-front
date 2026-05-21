import type { Produto } from "../types/Produto";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/produtos`;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const erro = await response.json().catch(() => null);
    throw new Error(erro?.mensagem ?? `Erro ${response.status}`);
  }
  if (response.status === 204) return null as T;
  return response.json() as Promise<T>;
}

const ProdutoService = {
  async getAll(): Promise<Produto[]> {
    const res = await fetch(BASE_URL);
    return handleResponse<Produto[]>(res);
  },

  async getById(id: number): Promise<Produto> {
    const res = await fetch(`${BASE_URL}/${id}`);
    return handleResponse<Produto>(res);
  },

  async create(produto: Produto): Promise<Produto> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });
    return handleResponse<Produto>(res);
  },

  async remove(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return handleResponse<void>(res);
  },
};

export default ProdutoService;
