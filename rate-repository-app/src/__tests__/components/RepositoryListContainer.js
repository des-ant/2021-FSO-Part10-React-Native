import { render, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const repositoryItems = getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const firstItemName = within(firstRepositoryItem).getByText(/^jared/);
      expect(firstItemName).toHaveTextContent(
        'jaredpalmer/formik'
      );
      const firstItemDescription = within(firstRepositoryItem).getByText(/^Build forms in/);
      expect(firstItemDescription).toHaveTextContent(
        'Build forms in React, without the tears'
      );
      const firstItemLanguage = within(firstRepositoryItem).getByText(/^Type/);
      expect(firstItemLanguage).toHaveTextContent(
        'TypeScript'
      );
      const firstItemForksCount = within(firstRepositoryItem).getByText(/^1/);
      expect(firstItemForksCount).toHaveTextContent(
        '1.6k'
      );
      const firstItemStargazers = within(firstRepositoryItem).getByText(/^21/);
      expect(firstItemStargazers).toHaveTextContent(
        '21.9k'
      );

      const secondItemName = within(secondRepositoryItem).getByText(/^asy/);
      expect(secondItemName).toHaveTextContent(
        'async-library/react-async'
      );
      const secondItemDescription = within(secondRepositoryItem).getByText(/^Flex/);
      expect(secondItemDescription).toHaveTextContent(
        'Flexible promise-based React data loader'
      );
      const secondItemLanguage = within(secondRepositoryItem).getByText(/^Jav/);
      expect(secondItemLanguage).toHaveTextContent(
        'JavaScript'
      );
      const secondItemForksCount = within(secondRepositoryItem).getByText(/^6/);
      expect(secondItemForksCount).toHaveTextContent(
        '69'
      );
      const secondItemStargazers = within(secondRepositoryItem).getByText(/^1/);
      expect(secondItemStargazers).toHaveTextContent(
        '1.8k'
      );
    });
  });
});
