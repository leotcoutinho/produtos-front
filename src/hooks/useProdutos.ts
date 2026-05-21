import { useState, useEffect, useCallback } from "react";
import produtoService from "../services/ProdutoService";
import type { Produto } from "../types/Produto";

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  const carregarProdutos = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const data = await produtoService.getAll();
      setProdutos(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setErro(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const cadastrar = useCallback(async (produto: Produto) => {
    setLoading(true);
    setErro(null);
    try {
      const novo = await produtoService.create(produto);
      setProdutos((prev) => [...prev, novo]);
      return novo;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setErro(msg);
      throw e; // re-throw para o componente tratar se quiser
    } finally {
      setLoading(false);
    }
  }, []);

  const remover = useCallback(async (id: number) => {
    setLoading(true);
    setErro(null);
    try {
      await produtoService.remove(id);
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setErro(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  // Carrega ao montar
  useEffect(() => {
    async function executar() {
      await carregarProdutos();
    }

    executar();
  }, [carregarProdutos]);

  return {
    produtos,
    loading,
    erro,
    cadastrar,
    remover,
    recarregar: carregarProdutos,
  };
}
