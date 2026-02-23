import type { PaymentMethodInterface } from "@/api/payment-method";
import type { UseMutationResult } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import DialogModal from "@/components/reusables/dialog-modal";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { styles } from "@/styles";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface PaymentMethodActionsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  createMutation?: UseMutationResult<
    any,
    unknown,
    PaymentMethodInterface,
    unknown
  >;
  updateMutation?: UseMutationResult<
    any,
    unknown,
    {
      id: string;
      payload: PaymentMethodInterface;
    },
    unknown
  >;
  selectedMethod?: { id: string; type: string; name: string } | null;
}
const method_types = [
  {
    value: "BANK",
    label: "Bank",
  },
  {
    value: "TWINT",
    label: "Twint",
  },
  {
    value: "CASH",
    label: "Cash",
  },
];
const formSchema = z.object({
  type: z.enum(["CASH", "BANK", "TWINT"], {
    message: "Type must be one of: CASH, BANK, TWINT",
  }),
  name: z.string().min(2, "Name must be at least 2 characters."),
});

const PaymentMethodActions = ({
  isOpen,
  setIsOpen,
  createMutation,
  updateMutation,
  selectedMethod,
}: PaymentMethodActionsProps) => {
  const isEditMode = !!selectedMethod;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: (selectedMethod?.type as "BANK" | "TWINT" | "CASH") ?? "BANK",
      name: selectedMethod?.name ?? "",
    },
  });
  // this useEffect shows
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditMode) {
      updateMutation?.mutate({
        id: selectedMethod.id,
        payload: { type: values.type, name: values.name },
      });
    } else {
      createMutation?.mutate(values);
      console.log(values);
    }
  }
  return (
    <DialogModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h2 className="text-lg font-semibold mb-4">
        {isEditMode ? "Edit Payment" : "Add Payment"}
      </h2>
      <form
        id="payment-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className=""
      >
        <FieldGroup className="gap-4">
          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="payment-type">
                  Payment Method Type
                </FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Payment Methods</SelectLabel>
                      {method_types.map((type) => (
                        <SelectItem value={type.value}>{type.label}</SelectItem>
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
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter name"
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
              disabled={isEditMode}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="payment-form"
              className={`cursor-pointer ${styles.primaryBgColor} hover:${styles.primaryBgColor}`}
            >
              {/* {isEditMode && updateMutation?.isPending ? (
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
              )} */}
              Submit
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </DialogModal>
  );
};

export default PaymentMethodActions;
