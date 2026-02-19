import React from "react";
import DialogModal from "@/components/reusables/dialog-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import type { UseMutationResult } from "@tanstack/react-query";
interface CustomerType {
  customer_name: string;
  email: string;
  phone: string;
}
interface DialogControlProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  createMutation: UseMutationResult<any, Error, CustomerType, unknown>;
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
}: DialogControlProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    createMutation.mutate(data);
    console.log(data);
  }

  return (
    <div>
      <DialogModal isOpen={isOpen} setIsOpen={setIsOpen}>
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
              >
                Reset
              </Button>
              <Button type="submit" form="customer-form">
                Submit
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogModal>
    </div>
  );
};

export default CustomerActions;
