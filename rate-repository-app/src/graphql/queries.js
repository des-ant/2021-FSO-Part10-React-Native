import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      edges {
        node {
          id
          fullName
          stargazersCount
          ownerAvatarUrl
          description
          language
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;
