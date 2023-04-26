import { graphql } from '@reaktor-contentful/gql';
import contentfulClient from '@reaktor-contentful/app/contentful-client';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { ApolloQueryResult } from '@apollo/client';
import { GetReaktorianQuery } from '@reaktor-contentful/gql/graphql';

const getReaktorian = graphql(/* GraphQL */ `
  query GetReaktorian($id: String!) {
    pastProjectCollection(where: { reaktorian: { sys: { id: $id } } }) {
      items {
        description {
          json
          links {
            entries {
              inline {
                sys {
                  id
                }
              }
            }
            assets {
              block {
                sys {
                  id
                }
                url
                title
                width
                height
                description
              }
            }
          }
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

const buildRenderOptions = (
  data: ApolloQueryResult<GetReaktorianQuery>
): Options => {
  const getAsset = (id: string) => {
    for (const item of data?.data?.pastProjectCollection?.items || []) {
      const asset = item?.description?.links?.assets?.block.find(
        (a: any) => a.sys.id === id
      );
      if (asset) {
        return asset;
      }
    }
    return undefined;
  };

  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        const id = node.data.target.sys.id;
        const asset = getAsset(id);
        return (
          asset?.url && (
            <img src={asset.url} height={asset.height!} width={asset.width!} />
          )
        );
      },
    },
  };
};

export default async function Reaktorian({
  params,
}: {
  params: { id: string };
}) {
  const data = await contentfulClient.query({
    query: getReaktorian,
    variables: { id: params.id },
    fetchPolicy: 'no-cache',
  });

  const renderOptions = buildRenderOptions(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {data.data.pastProjectCollection?.items.map((item, i) => {
          const description = documentToReactComponents(
            // @ts-ignore
            item!.description!.json,
            renderOptions
          );
          return (
            <div key={`pastProject_${i}`}>
              <div>{item?.title}</div>
              <div>{description}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
