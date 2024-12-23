"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { HarvestForm } from "@/components/screens/HarvestForm";
import { DeleteConfirmation } from "@/components/screens/DeleteConfirmation";
import { harvestsAPI } from "@/lib/axios/utils";
import { signOut } from "next-auth/react";

interface Harvest {
  id: string;
  seedType: string;
  location: string;
  yield: number;
  fertilizer: string;
  quantity: number;
  date: string;
}

export default function Home() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    harvest: Harvest | null;
  }>({
    isOpen: false,
    harvest: null,
  });
  const [formDialog, setFormDialog] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    harvest?: Harvest;
  }>({
    isOpen: false,
    mode: "create",
  });
  const fetchHarvests = async () => {
    const response = await harvestsAPI.getAll();
    setHarvests(response);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (formDialog.mode === "edit") {
        await harvestsAPI.update(formDialog.harvest?.id as string, data);
      }

      if (formDialog.mode === "create") {
        await harvestsAPI.create(data);
      }

      fetchHarvests();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    } finally {
      setFormDialog({ isOpen: false, mode: "create" });
    }
  };
  const handleDelete = async () => {
    try {
      if (deleteDialog.harvest) {
        await harvestsAPI.delete(deleteDialog.harvest.id as string);
        fetchHarvests();
      }
    } catch (error) {
      console.error("Erro ao deletar a colheita:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchHarvests();
  }, []);

  const filteredHarvests = harvests.filter((harvest) => {
    const matchesSearch = harvest.seedType
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleEdit = (harvest: Harvest) => {
    setFormDialog({
      isOpen: true,
      mode: "edit",
      harvest,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center justify-center gap-5">
          <h1 className="text-3xl font-bold text-green-800">
            Gestão de Colheitas
          </h1>
          <p className="font-bold text-green-800 md:block hidden">
            {session?.user?.name}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            className="bg-green-700 hover:bg-green-800"
            onClick={() => setFormDialog({ isOpen: true, mode: "create" })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nova Colheita
          </Button>
          <Button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600"
          >
            Sair
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por Semente.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Semente</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Fertilizante</TableHead>
              <TableHead>Quantidade (t)</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHarvests.map((harvest) => (
              <TableRow key={harvest.id}>
                <TableCell className="font-medium">
                  {harvest.seedType}
                </TableCell>
                <TableCell>{harvest.location}</TableCell>
                <TableCell>{harvest.fertilizer}</TableCell>
                <TableCell>{harvest.quantity}</TableCell>
                <TableCell>
                  {new Date(harvest.date).toLocaleDateString("pt-BR")}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-green-700"
                    onClick={() => handleEdit(harvest)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-red-700"
                    onClick={() => setDeleteDialog({ isOpen: true, harvest })}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog
        open={formDialog.isOpen}
        onOpenChange={(isOpen) =>
          setFormDialog((prev) => ({ ...prev, isOpen }))
        }
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {formDialog.mode === "create"
                ? "Adicionar Nova Colheita"
                : "Editar Colheita"}
            </DialogTitle>
          </DialogHeader>
          <HarvestForm
            onSubmit={handleSubmit}
            onCancel={() => setFormDialog({ isOpen: false, mode: "create" })}
            initialData={formDialog.harvest}
            isEditing={formDialog.mode === "edit"}
          />
        </DialogContent>
      </Dialog>
      <DeleteConfirmation
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, harvest: null })}
        onConfirm={handleDelete}
        itemName={deleteDialog.harvest?.seedType || ""}
      />
    </div>
  );
}
