/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Ninja } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function NinjaCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    belt: "",
    name: "",
    dojo: "",
  };
  const [belt, setBelt] = React.useState(initialValues.belt);
  const [name, setName] = React.useState(initialValues.name);
  const [dojo, setDojo] = React.useState(initialValues.dojo);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setBelt(initialValues.belt);
    setName(initialValues.name);
    setDojo(initialValues.dojo);
    setErrors({});
  };
  const validations = {
    belt: [{ type: "Required" }],
    name: [{ type: "Required" }],
    dojo: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          belt,
          name,
          dojo,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Ninja(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "NinjaCreateForm")}
      {...rest}
    >
      <TextField
        label="Belt"
        isRequired={true}
        isReadOnly={false}
        value={belt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              belt: value,
              name,
              dojo,
            };
            const result = onChange(modelFields);
            value = result?.belt ?? value;
          }
          if (errors.belt?.hasError) {
            runValidationTasks("belt", value);
          }
          setBelt(value);
        }}
        onBlur={() => runValidationTasks("belt", belt)}
        errorMessage={errors.belt?.errorMessage}
        hasError={errors.belt?.hasError}
        {...getOverrideProps(overrides, "belt")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              belt,
              name: value,
              dojo,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Dojo"
        isRequired={true}
        isReadOnly={false}
        value={dojo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              belt,
              name,
              dojo: value,
            };
            const result = onChange(modelFields);
            value = result?.dojo ?? value;
          }
          if (errors.dojo?.hasError) {
            runValidationTasks("dojo", value);
          }
          setDojo(value);
        }}
        onBlur={() => runValidationTasks("dojo", dojo)}
        errorMessage={errors.dojo?.errorMessage}
        hasError={errors.dojo?.hasError}
        {...getOverrideProps(overrides, "dojo")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
