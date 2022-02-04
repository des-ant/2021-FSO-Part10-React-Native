import { gql } from '@apollo/client';

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