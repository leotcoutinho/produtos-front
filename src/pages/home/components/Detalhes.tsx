import { DataGrid, type GridRowsProp, type GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import ProdutoService from "../../../services/ProdutoService";
import type { Produto } from "../../../types/Produto";

interface DetalhesProps {
  produtos: Produto[];
}

function Detalhes(props: DetalhesProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>(props.produtos);
  const [loading, setLoading] = useState(false);

  const rows: GridRowsProp = produtos.map((p) => ({
    id: p.id,
    nome: p.nome,
    valor: p.valor,
  }));

  const columns: GridColDef[] = [
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "valor", headerName: "Valor", width: 150 },
  ];

  const handleExcluirSelecionados = async () => {
    setLoading(true);

    try {
      await Promise.all(selectedIds.map((id) => ProdutoService.remove(id)));
      setProdutos((prev) => prev.filter((p) => !selectedIds.includes(p.id!)));
      setSelectedIds([]);
    } catch (e) {
      alert("Erro ao excluir produtos selecionados: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700">Produtos</h3>
      <hr />
      <br />
      <button
        onClick={handleExcluirSelecionados}
        disabled={selectedIds.length === 0 || loading}
        style={{ marginBottom: 10 }}
        className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading
          ? "Excluindo..."
          : `Excluir Selecionados (${selectedIds.length})`}
      </button>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(model) => {
          if (model && "ids" in model) {
            setSelectedIds([...model.ids].map(Number));
          } else if (Array.isArray(model)) {
            setSelectedIds(Array(model).map(Number));
          }
        }}
        rowSelectionModel={{ type: "include", ids: new Set(selectedIds) }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        pageSizeOptions={[10]}
      />
    </div>
  );
}

export default Detalhes;
