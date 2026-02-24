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
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Invoice } from "@/api/invoices";
import DialogModal from "@/components/reusables/dialog-modal";

interface DialogControlProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  // create props
  createMutation?: UseMutationResult<any, unknown, Invoice, unknown>;
  // edit props
  updateMutation?: UseMutationResult<
    any,
    unknown,
    { id: string; payload: Invoice },
    unknown
  >;
  selectedInvoice?: {
    id: string;
    customerId: string;
    customer_name: string;
    serviceId: string;
    service_name: string;
    paymentMethodId: string;
    method_type: string;
    amount: number;
  } | null;
  customer_data?: { id: string; name: string }[];
  service_data?: { id: string; name: string }[];
  payment_method_data?: { id: string; type: string }[];
}

const formSchema = z.object({
  customerId: z.string("Customer must be selected."),
  serviceId: z.string("Service must be selected."),
  paymentMethodId: z.string("Method type must be selected."),
  amount: z
    .number("Enter price a positive number")
    .min(0.01, "Price must be greater than 0"),
});
const InvoiceActions = ({
  isOpen,
  setIsOpen,
  createMutation,
  customer_data,
  service_data,
  payment_method_data,
  updateMutation,
  selectedInvoice,
}: DialogControlProps) => {
  const isEditMode = !!selectedInvoice; // true if editing, false if creating
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: selectedInvoice?.customerId ?? "",
      serviceId: selectedInvoice?.serviceId ?? "",
      paymentMethodId: selectedInvoice?.paymentMethodId ?? "",
      amount: selectedInvoice?.amount ?? 0,
    },
  });

  useEffect(() => {
    form.reset({
      customerId: selectedInvoice?.customerId,
      serviceId: selectedInvoice?.serviceId,
      paymentMethodId: selectedInvoice?.paymentMethodId,
      amount: selectedInvoice?.amount,
    });
  }, [selectedInvoice]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(selectedInvoice?.customerId);

    if (isEditMode) {
      updateMutation?.mutate({
        id: selectedInvoice.id,
        payload: {
          customerId: data.customerId,
          serviceId: data?.serviceId,
          paymentMethodId: data?.paymentMethodId,
          amount: data.amount,
        },
      });
      setTimeout(
        () =>
          form.reset({
            customerId: "",
            serviceId: "",
            paymentMethodId: "",
            amount: 0,
          }),
        2000,
      );
    } else {
      createMutation?.mutate(data);
      setTimeout(() => {
        form.reset({
          customerId: "",
          serviceId: "",
          paymentMethodId: "",
          amount: 0,
        });
      }, 2000);
    }
  }

  return (
    <div>
      <DialogModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className="text-lg font-semibold mb-4">
          {isEditMode ? "Edit Invoice" : "Add Invoice"}
        </h2>
        <form
          id="invoice-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className=""
        >
          <FieldGroup className="gap-4">
            <Controller
              name="customerId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customer-name">Customer</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={
                      isEditMode
                        ? updateMutation?.isPending
                        : createMutation?.isPending
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Customer</SelectLabel>
                        {customer_data?.map((customer) => (
                          <SelectItem value={customer.id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="serviceId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="service-name">Service</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={
                      isEditMode
                        ? updateMutation?.isPending
                        : createMutation?.isPending
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Service</SelectLabel>
                        {service_data?.map((service) => (
                          <SelectItem value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="paymentMethodId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="payment-name">Payment Method</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={
                      isEditMode
                        ? updateMutation?.isPending
                        : createMutation?.isPending
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Payment Method</SelectLabel>
                        {payment_method_data?.map((method) => (
                          <SelectItem value={method.id}>
                            {method.type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="amount">Price</FieldLabel>
                  <Input
                    {...field}
                    id="price"
                    {...form.register("amount", { valueAsNumber: true })}
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
                form="invoice-form"
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

export default InvoiceActions;
