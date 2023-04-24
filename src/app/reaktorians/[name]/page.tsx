import { graphql } from '@reaktor-contentful/gql';
import contentfulClient from '@reaktor-contentful/app/contentful-client';

const getReaktorian = graphql(/* GraphQL */ `
  query GetReaktorian($name: String!) {
    pastProjectCollection(where: { reaktorian: { name: $name } }) {
      items {
        description {
          json
        }
        title
        reaktorian {
          aboutMe
          name
          picture {
            contentType
            url
          }
        }
      }
    }
  }
`);

export default async function Reaktorian({
  params,
}: {
  params: { name: string };
}) {
  const data = await contentfulClient.query({
    query: getReaktorian,
    variables: { name: params.name },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{params.name}</h1>
      <div>
        {data.data.pastProjectCollection?.items.map((item) => (
          <div>
            <div>{item?.title}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
