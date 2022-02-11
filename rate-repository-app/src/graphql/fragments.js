import { gql } from '@apollo/client';

const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
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
    reviews {
      edges {
        node {
          ...ReviewDetails
        }
      }
    }
  }
  ${REVIEW_DETAILS}
`;

export const PAGEINFO_DETAILS = gql`
  fragment PageInfoDetails on PageInfo {
    hasPreviousPage
    hasNextPage
    startCursor
    endCursor
  }
`;
