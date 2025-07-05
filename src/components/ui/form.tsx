import React, { type JSX } from "react";
import {
    Controller,
    FormProvider,
    useFormContext,
    useFormState,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from "react-hook-form";
import { cn } from "@/lib/utils";

// Main Form wrapper using FormProvider
const Form = FormProvider;

// --- Contexts ---
type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
);

type FormItemContextValue = {
    id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
);

// --- FormField Wrapper ---
function FormField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ ...props }: ControllerProps<TFieldValues, TName>) {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
}

// --- Custom hook for accessing field context ---
function useFormField() {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState } = useFormContext();
    const formState = useFormState({ name: fieldContext.name });
    const fieldState = getFieldState(fieldContext.name, formState);

    if (!fieldContext) {
        throw new Error("useFormField must be used within <FormField>");
    }

    const { id } = itemContext;

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
}

// --- UI Components ---
function FormItem({
                      className,
                      ...props
                  }: React.ComponentProps<"div">): JSX.Element {
    const id = React.useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                data-slot="form-item"
                className={cn(
                    "grid w-full items-start gap-1.5 rounded-lg border border-gray-200 p-4 bg-white shadow-sm transition hover:shadow-md",
                    className
                )}
                {...props}
            />
        </FormItemContext.Provider>
    );
}

function FormLabel({
                       className,
                       ...props
                   }: React.ComponentProps<"label">): JSX.Element {
    const { error, formItemId } = useFormField();

    return (
        <label
            data-slot="form-label"
            data-error={!!error}
            htmlFor={formItemId}
            className={cn("font-medium text-base", !!error && "text-red-600", className)}
            {...props}
        />
    );
}

function FormControl({
                         children,
                         className,
                         ...props
                     }: React.ComponentProps<"div">): JSX.Element {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
        <div
            data-slot="form-control"
            id={formItemId}
            aria-describedby={
                !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            className={className}
            {...props}
        >
            {children}
        </div>
    );
}

function FormDescription({
                             className,
                             ...props
                         }: React.ComponentProps<"p">): JSX.Element {
    const { formDescriptionId } = useFormField();

    return (
        <p
            data-slot="form-description"
            id={formDescriptionId}
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    );
}

function FormMessage({
                         className,
                         children,
                         ...props
                     }: React.ComponentProps<"p">): JSX.Element | null {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error.message ?? "") : children;

    if (!body) return null;

    return (
        <p
            data-slot="form-message"
            id={formMessageId}
            className={cn("text-red-600 text-sm flex items-center gap-1", className)}
            {...props}
        >
      <span role="img" aria-label="error">
        ⚠️
      </span>{" "}
            {body}
        </p>
    );
}

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
};
