"use client";

import { cn } from "@/lib/utils";
import type { BaseFormFieldProps } from "@/types/base-form";
import type { FieldPath, FieldValues } from "react-hook-form";

import type { HTMLAttributes } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { MinimalTiptap, type MinimalTiptapProps } from "../ui/minimal-tiptap";
import { Show } from "../utilities";

interface FormMinimalTiptapProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFormFieldProps<TFieldValues, TName>,
    Omit<MinimalTiptapProps, "content" | "onChange" | "editable" | "disabled"> {
  labelClassName?: HTMLAttributes<HTMLLabelElement>["className"];
  containerClassName?: HTMLAttributes<HTMLDivElement>["className"];
  requiredClassName?: HTMLAttributes<HTMLSpanElement>["className"];
  inputContainerClassName?: HTMLAttributes<HTMLDivElement>["className"];
  subLabel?: string;
  isShowError?: boolean;
}

function FormMinimalTiptap<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  required,
  disabled,
  readOnly,
  className,
  inputContainerClassName,
  initialContent,
  placeholder,
  ...props
}: FormMinimalTiptapProps<TFieldValues, TName>) {
  const editable = !(disabled || readOnly);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className='ml-1 text-red-500'>*</span>}
            </FormLabel>
          )}

          <FormControl>
            <MinimalTiptap
              {...props}
              content={field.value ?? ""}
              onChange={field.onChange}
              initialContent={initialContent}
              placeholder={placeholder}
              editable={editable}
              disabled={disabled}
              className={cn("min-h-96", inputContainerClassName)}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormMinimalTiptap };
