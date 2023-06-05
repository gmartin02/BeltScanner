/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNinja = /* GraphQL */ `
  query GetNinja($belt: String!) {
    getNinja(belt: $belt) {
      belt
      id
      name
      dojo
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listNinjas = /* GraphQL */ `
  query ListNinjas(
    $belt: String
    $filter: ModelNinjaFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNinjas(
      belt: $belt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        belt
        id
        name
        dojo
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
