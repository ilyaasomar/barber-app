import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
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
import { CalendarIcon, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DialogModal from "@/components/reusables/dialog-modal";
import type { Appointment } from "@/api/appointments";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DialogControlProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  // create props
  createMutation?: UseMutationResult<any, unknown, Appointment, unknown>;
  // edit props
  updateMutation?: UseMutationResult<
    any,
    unknown,
    { id: string; payload: Appointment },
    unknown
  >;
  selectedAppointment?: {
    id: string;
    customerId: string;
    customer_name: string;
    serviceId: string;
    service_name: string;
    date: Date;
    status: string;
  } | null;
  customer_data?: { id: string; name: string }[];
  service_data?: { id: string; name: string }[];
}

const formSchema = z.object({
  customerId: z.string("Customer must be selected."),
  serviceId: z.string("Service must be selected."),
  date: z.date("Date must be selected"),
  status: z.string("Status must be selected."),
});
const AppointmentActions = ({
  isOpen,
  setIsOpen,
  createMutation,
  customer_data,
  service_data,
  updateMutation,
  selectedAppointment,
}: DialogControlProps) => {
  const isEditMode = !!selectedAppointment; // true if editing, false if creating

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: selectedAppointment?.customerId ?? "",
      serviceId: selectedAppointment?.serviceId ?? "",
      date: selectedAppointment?.date ?? new Date(),
      status: selectedAppointment?.status ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      customerId: selectedAppointment?.customerId,
      serviceId: selectedAppointment?.serviceId,
      date: selectedAppointment?.date,
      status: selectedAppointment?.status,
    });
  }, [selectedAppointment]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (isEditMode) {
      updateMutation?.mutate({
        id: selectedAppointment.id,
        payload: {
          customerId: data.customerId,
          serviceId: data?.serviceId,
          date: data?.date,
          status: data.status,
        },
      });
      setTimeout(
        () =>
          form.reset({
            customerId: "",
            serviceId: "",
            date: new Date(),
            status: "",
          }),
        2000,
      );
    } else {
      createMutation?.mutate(data);
      setTimeout(() => {
        form.reset({
          customerId: "",
          serviceId: "",
          date: new Date(),
          status: "",
        });
      }, 2000);
    }
  }

  return (
    <div>
      <DialogModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className="text-lg font-semibold mb-4">
          {isEditMode ? "Edit Appointment" : "Add Appointment"}
        </h2>
        <form
          id="appointment-form"
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
                          <SelectItem key={customer.id} value={customer.id}>
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
                          <SelectItem key={service.id} value={service.id}>
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
              name="date"
              control={form.control}
              render={({ field, fieldState }) => {
                const [time, setTime] = React.useState(
                  field.value
                    ? field.value.toTimeString().slice(0, 5)
                    : "10:30",
                );

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Date & Time</FieldLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP p")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(selectedDate) => {
                            if (!selectedDate) return;
                            const [hours, minutes] = time
                              .split(":")
                              .map(Number);
                            const combinedDate = new Date(selectedDate);
                            combinedDate.setHours(hours, minutes, 0, 0);
                            field.onChange(combinedDate);
                          }}
                        />
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => {
                            setTime(e.target.value);
                            if (!field.value) return;
                            const [hours, minutes] = e.target.value
                              .split(":")
                              .map(Number);
                            const newDate = new Date(field.value);
                            newDate.setHours(hours, minutes, 0, 0);
                            field.onChange(newDate);
                          }}
                          className="mt-2"
                        />
                      </PopoverContent>
                    </Popover>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="status">Status</FieldLabel>
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
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="waiting">Waiting</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                form="appointment-form"
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

export default AppointmentActions;
