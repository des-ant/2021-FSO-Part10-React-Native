import { gql } from '@apollo/client';
import {
  REPOSITORY_DETAILS,
  PAGEINFO_DETAILS,
  REPOSITORY_VIEW_DETAILS,
  REVIEW_DETAILS,
} from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $first: Int,
    $after: String,
  ) {
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      first: $first,
      after: $after,
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        ...PageInfoDetails
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${PAGEINFO_DETAILS}
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        ...ReviewDetails
      }
    }
  }
  ${REVIEW_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query Repository(
    $id: ID!,
    $first: Int,
    $after: String,
  ) {
    repository(id: $id) {
      ...RepositoryViewDetails
    }
  }
  ${REPOSITORY_VIEW_DETAILS}
`;
