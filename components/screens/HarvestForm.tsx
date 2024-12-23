"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const harvestFormSchema = z.object({
  seedType: z.string().min(1, "A cultura é obrigatória"),
  location: z.string().min(1, "O local é obrigatório"),
  fertilizer: z.string().min(1, "A cultura é obrigatória"),
  quantity: z.string().min(1, "A quantidade é obrigatória").transform(Number),
  date: z.string().min(1, "A data é obrigatória"),
});

type HarvestFormData = z.infer<typeof harvestFormSchema>;

interface HarvestFormProps {
  onSubmit: (data: HarvestFormData) => void;
  onCancel: () => void;
  initialData?: HarvestFormData;
  isEditing?: boolean;
}
export function HarvestForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: HarvestFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<HarvestFormData>({
    resolver: zodResolver(harvestFormSchema),
    defaultValues: initialData || {
      seedType: "",
      location: "",
      fertilizer: "",
      quantity: 0,
      date: new Date().toISOString().split("T")[0],
    },
  });

  const handleSubmit = async (data: HarvestFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="seedType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semente</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Soja" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Rio de Janeiro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade (t)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Ex: 150"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fertilizer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fertilizante</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Composto Orgânico" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Prevista</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-green-700 hover:bg-green-800"
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
