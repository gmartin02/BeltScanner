/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNinja = /* GraphQL */ `
  mutation CreateNinja(
    $input: CreateNinjaInput!
    $condition: ModelNinjaConditionInput
  ) {
    createNinja(input: $input, condition: $condition) {
      belt
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateNinja = /* GraphQL */ `
  mutation UpdateNinja(
    $input: UpdateNinjaInput!
    $condition: ModelNinjaConditionInput
  ) {
    updateNinja(input: $input, condition: $condition) {
      belt
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteNinja = /* GraphQL */ `
  mutation DeleteNinja(
    $input: DeleteNinjaInput!
    $condition: ModelNinjaConditionInput
  ) {
    deleteNinja(input: $input, condition: $condition) {
      belt
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
