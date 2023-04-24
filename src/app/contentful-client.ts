import 'server-only';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://graphql.contentful.com/content/v1/spaces/hsg986itelz1',
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
}));

const contentfulClient = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: 'https://graphql.contentful.com/content/v1/spaces/hsg986itelz1',
  cache: new InMemoryCache(),
});

export default contentfulClient;
