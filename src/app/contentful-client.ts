import 'server-only';
import { createClient } from 'contentful';

const getMandatoryEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing mandatory env var ${name}`);
  }
  return value;
};

const contentfulClient = createClient({
  space: getMandatoryEnvVar('CONTENTFUL_SPACE_ID'),
  accessToken: getMandatoryEnvVar('CONTENTFUL_ACCESS_TOKEN'),
});

export default contentfulClient;
