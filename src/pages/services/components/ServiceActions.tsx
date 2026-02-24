import DialogModal from "@/components/reusables/dialog-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import type { UseMutationResult } from "@tanstack/react-query";
import { styles } from "@/styles";
import { Loader2 } from "lucide-react";
import type { Service } from "@/api/services";
import { useEffect } from "react";

interface DialogControlProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  // create props
  createMutation?: UseMutationResult<any, unknown, Service, unknown>;
  // edit props
  updateMutation?: UseMutationResult<
    any,
    unknown,
    { id: string; payload: Service },
    unknown
  >;
  selectedService?: {
    id: string;
    name: string;
    description: string;
    price: number;
  } | null;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(2, "Description must be at least 2 characters."),
  price: z.number().min(0.01, "Price must be greater than 0"),
});
const ServiceActions = ({
  isOpen,
  setIsOpen,
  createMutation,
  updateMutation,
  selectedService,
}: DialogControlProps) => {
  const isEditMode = !!selectedService; // true if editing, false if creating

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedService?.name ?? "",
      description: selectedService?.description ?? "",
      price: selectedService?.price ?? 0,
    },
  });

  useEffect(() => {
    form.reset({
      name: selectedService?.name,
      description: selectedService?.description,
      price: selectedService?.price,
    });
  }, [selectedService]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (isEditMode) {
      updateMutation?.mutate({
        id: selectedService.id,
        payload: {
          name: data.name,
          description: data?.description,
          price: data?.price,
        },
      });
      setTimeout(
        () => form.reset({ name: "", description: "", price: 0 }),
        2000,
      );
    } else {
      createMutation?.mutate(data);
      setTimeout(() => {
        form.reset({
          name: "",
          description: "",
          price: 0,
        });
      }, 2000);
    }
  }

  return (
    <div>
      <DialogModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className="text-lg font-semibold mb-4">
          {isEditMode ? "Edit Service" : "Add Service"}
        </h2>
        <form
          id="service-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className=""
        >
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="service-name">Service Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Service"
                    autoComplete="on"
                    disabled={
                      isEditMode
                        ? updateMutation?.isPending
                        : createMutation?.isPending
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Input
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter description"
                    autoComplete="on"
                    disabled={
                      isEditMode
                        ? updateMutation?.isPending
                        : createMutation?.isPending
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="price">Price</FieldLabel>
                  <Input
                    {...field}
                    id="price"
                    {...form.register("price", { valueAsNumber: true })}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter price"
                    autoComplete="on"
                    disabled={
                      isEditMode
                        ? updateMutation?.isPending
                        : createMutation?.isPending
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={
                  isEditMode && isEditMode
                    ? updateMutation?.isPending
                    : createMutation?.isPending
                }
              >
                Reset
              </Button>
              <Button
                type="submit"
                form="service-form"
                className={`cursor-pointer ${styles.primaryBgColor} hover:${styles.primaryBgColor}`}
                disabled={
                  isEditMode
                    ? updateMutation?.isPending
                    : createMutation?.isPending
                }
              >
                {isEditMode && updateMutation?.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating....
                  </>
                ) : createMutation?.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : isEditMode ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogModal>
    </div>
  );
};

export default ServiceActions;
