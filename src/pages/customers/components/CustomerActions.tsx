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
import { useEffect } from "react";
import type { Customer } from "@/api/customers";
import { Loader2 } from "lucide-react";

interface DialogControlProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  // create props
  createMutation?: UseMutationResult<any, unknown, Customer, unknown>;
  // edit props
  updateMutation?: UseMutationResult<
    any,
    unknown,
    { id: string; payload: Customer },
    unknown
  >;
  selectedCustomer?: {
    id: string;
    customer_name: string;
    email: string;
    phone: string;
  } | null;
}

const formSchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email().min(2, "Email must be at least 2 characters."),
  phone: z
    .string()
    .min(9, "Phone number must be at least 9")
    .max(12, "Phone number must be at least 12 characters"),
});
const CustomerActions = ({
  isOpen,
  setIsOpen,
  createMutation,
  updateMutation,
  selectedCustomer,
}: DialogControlProps) => {
  const isEditMode = !!selectedCustomer; // true if editing, false if creating

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_name: selectedCustomer?.customer_name ?? "",
      email: selectedCustomer?.email ?? "",
      phone: selectedCustomer?.phone ?? "",
    },
  });

  // re-fill form whenever selected customer changes
  useEffect(() => {
    form.reset({
      customer_name: selectedCustomer?.customer_name,
      email: selectedCustomer?.email,
      phone: selectedCustomer?.phone,
    });
  }, [selectedCustomer]);
  function onSubmit(data: z.infer<typeof formSchema>) {
    if (isEditMode) {
      // to avoid typescript error customer & customer type i have to write and tell customer name=name
      updateMutation?.mutate({
        id: selectedCustomer.id,
        payload: {
          name: data.customer_name,
          email: data?.email,
          phone: data?.phone,
        },
      });
      setTimeout(
        () => form.reset({ customer_name: "", email: "", phone: "" }),
        2000,
      );
    } else {
      createMutation?.mutate({
        name: data.customer_name,
        email: data?.email,
        phone: data?.phone,
      });
      setTimeout(() => {
        form.reset({
          customer_name: "",
          email: "",
          phone: "",
        });
      }, 2000);
    }
  }

  return (
    <div>
      <DialogModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className="text-lg font-semibold mb-4">
          {isEditMode ? "Edit Customer" : "Add Customer"}
        </h2>
        <form
          id="customer-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className=""
        >
          <FieldGroup className="gap-4">
            <Controller
              name="customer_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customer-name">Customer Name</FieldLabel>
                  <Input
                    {...field}
                    id="customer_name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter customer name"
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
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter customer email"
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
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter customer number"
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
                disabled={isEditMode}
              >
                Reset
              </Button>
              <Button
                type="submit"
                form="customer-form"
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

export default CustomerActions;
