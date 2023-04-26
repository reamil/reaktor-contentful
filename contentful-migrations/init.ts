import { MigrationFunction } from 'contentful-migration';

const migration: MigrationFunction = (migration) => {
  const reaktorian = migration.createContentType('reaktorian', {
    name: 'Reaktorian',
    description: 'List of employees of Reaktor Innovations Oy',
  });

  // note, that assets are not a separate content type.
  reaktorian
    .createField('picture')
    .type('Link')
    .name('Picture')
    .linkType('Asset');

  reaktorian.createField('name').name('Name').type('Symbol').required(true);

  reaktorian.createField('aboutMe').name('About me').type('Text');

  // defines the field that will be used as the title for the entry
  reaktorian.displayField('name');

  const pastProjects = migration.createContentType('pastProject', {
    name: 'Past Project',
    description: 'Projects that the reaktorian has worked on in the past',
  });

  pastProjects
    .createField('title')
    .name('Project title')
    .type('Symbol')
    .required(true);

  pastProjects
    .createField('description')
    .name('Project description')
    .localized(true)
    .type('RichText')
    .validations([
      {
        nodes: {
          'asset-hyperlink': [
            {
              size: {
                max: 5,
              },
              message: null,
            },
          ],
          'embedded-asset-block': [
            {
              size: {
                max: 5,
              },
              message: null,
            },
          ],
          'embedded-entry-block': [
            {
              size: {
                max: 3,
              },
              message: null,
            },
          ],
          'embedded-entry-inline': [
            {
              size: {
                max: 5,
              },
              message: null,
            },
          ],
          'entry-hyperlink': [
            {
              size: {
                max: 5,
              },
              message: null,
            },
          ],
        },
      },
    ]);

  // reference to a different content-type
  pastProjects
    .createField('reaktorian')
    .name('Reaktorian')
    .type('Link')
    .linkType('Entry')
    .validations([
      {
        linkContentType: ['reaktorian'],
      },
    ])
    .required(true);

  pastProjects.displayField('title');
};

module.exports = migration;
