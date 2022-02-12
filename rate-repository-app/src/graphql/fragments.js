import { gql } from '@apollo/client';

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on ReviewConnection {
    totalCount
    edges {
      node {
        id
        text
        rating
        createdAt
        user {
          id
          username
        }
        repository {
          id
          fullName
        }
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
`;

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    stargazersCount
    ownerAvatarUrl
    description
    language
    forksCount
    reviewCount
    ratingAverage
    url
  }
`;

export const PAGEINFO_DETAILS = gql`
  fragment PageInfoDetails on PageInfo {
    hasPreviousPage
    hasNextPage
    startCursor
    endCursor
  }
`;

export const REPOSITORY_VIEW_DETAILS = gql`
  fragment RepositoryViewDetails on Repository {
    ...RepositoryDetails
    reviews(first: $first, after: $after) {
      ...ReviewDetails
    }
  }
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
`;
