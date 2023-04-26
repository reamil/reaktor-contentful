import contentfulClient from '@reaktor-contentful/app/contentful-client';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';

const renderedOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      return (
        <Image
          alt={node.data.target.fields.title}
          src={`https:${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
        />
      );
    },
  },
};

export default async function Reaktorian({
  params,
}: {
  params: { id: string };
}) {
  const response = await contentfulClient.getEntries({
    content_type: 'pastProject',
    'fields.reaktorian.sys.id': params.id, // this allows you to filter entries by any field
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {response.items.map((item, i) => {
          const { title, description, reaktorian } = item.fields as {
            title: string;
            description: any;
            reaktorian: any;
          };
          return (
            <div key={`pastProject_${i}`}>
              <div>{title}</div>
              <div>
                {documentToReactComponents(description, renderedOptions)}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
