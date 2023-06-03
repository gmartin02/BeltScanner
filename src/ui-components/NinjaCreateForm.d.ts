/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NinjaCreateFormInputValues = {
    name?: string;
    belt?: string;
};
export declare type NinjaCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    belt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NinjaCreateFormOverridesProps = {
    NinjaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    belt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NinjaCreateFormProps = React.PropsWithChildren<{
    overrides?: NinjaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NinjaCreateFormInputValues) => NinjaCreateFormInputValues;
    onSuccess?: (fields: NinjaCreateFormInputValues) => void;
    onError?: (fields: NinjaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NinjaCreateFormInputValues) => NinjaCreateFormInputValues;
    onValidate?: NinjaCreateFormValidationValues;
} & React.CSSProperties>;
export default function NinjaCreateForm(props: NinjaCreateFormProps): React.ReactElement;