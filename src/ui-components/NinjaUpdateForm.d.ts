/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Ninja } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NinjaUpdateFormInputValues = {
    name?: string;
    belt?: string;
};
export declare type NinjaUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    belt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NinjaUpdateFormOverridesProps = {
    NinjaUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    belt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NinjaUpdateFormProps = React.PropsWithChildren<{
    overrides?: NinjaUpdateFormOverridesProps | undefined | null;
} & {
    belt?: string;
    ninja?: Ninja;
    onSubmit?: (fields: NinjaUpdateFormInputValues) => NinjaUpdateFormInputValues;
    onSuccess?: (fields: NinjaUpdateFormInputValues) => void;
    onError?: (fields: NinjaUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NinjaUpdateFormInputValues) => NinjaUpdateFormInputValues;
    onValidate?: NinjaUpdateFormValidationValues;
} & React.CSSProperties>;
export default function NinjaUpdateForm(props: NinjaUpdateFormProps): React.ReactElement;
