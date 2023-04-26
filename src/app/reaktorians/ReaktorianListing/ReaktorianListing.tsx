import 'server-only';
import contentfulClient from '@reaktor-contentful/app/contentful-client';
import './ReaktorianListing.css';
import Link from 'next/link';
import Image from 'next/image';

export default async function ReaktorianListing() {
  const response = await contentfulClient.getEntries({
    content_type: 'reaktorian',
  });

  console.log(JSON.stringify(response, null, 2));

  return (
    <div className="reaktorian-listing">
      <h1>Reaktorian Listing</h1>

      <div style={{ marginTop: '20px' }}>
        {response.items.map((reaktorian, i) => {
          // note that you have no types when using the contentful client directly
          const { picture, name, aboutMe } = reaktorian.fields as {
            picture: any;
            name: string;
            aboutMe: string;
          };
          return (
            <Link
              href={`/reaktorians/${reaktorian?.sys.id}`}
              key={`reaktorian_${i}`}
              className="item grid grid-cols-3 divide-x"
            >
              <div>
                <Image
                  alt="Reaktorian picture"
                  src={`https:${picture.fields.file.url}`}
                  width={picture.fields.file.details.image.width}
                  height={picture.fields.file.details.image.height}
                />
              </div>
              <div className="name">{name}</div>
              <div>{aboutMe}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
