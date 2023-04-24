import 'server-only';
import { graphql } from '../../../gql';
import contentfulClient from '@reaktor-contentful/app/contentful-client';
import './ReaktorianListing.css';

const listReaktorians = graphql(/* GraphQL */ `
  query ListReaktorians {
    reaktorianCollection {
      items {
        name
        aboutMe
        picture {
          contentType
          url
        }
      }
    }
  }
`);

export default async function ReaktorianListing() {
  const data = await contentfulClient.query({ query: listReaktorians });

  return (
    <div className="reaktorian-listing">
      <h1>Reaktorian Listing</h1>

      <div style={{ marginTop: '20px' }}>
        {data.data.reaktorianCollection?.items?.map((reaktorian, i) => (
          <div
            key={`reaktorian_${i}`}
            className="item grid grid-cols-3 divide-x"
          >
            <div>
              {reaktorian?.picture?.url && <img src={reaktorian.picture.url} />}
            </div>
            <div className="name">{reaktorian?.name}</div>
            <div>{reaktorian?.aboutMe}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
