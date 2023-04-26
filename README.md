# Contentful - Reaktor training materials

1. Install the contentful CLI:
   * `brew install contentful-cli`
   * `npm install -g contentful-cli`
2. Log in
   * `contentful login`
   * `contentful space use --space-id $SPACE_ID`
3. Create tokens
   * When in the contentful space, click Settings -> API keys
   * Create a "Content management token"
4. Run migrations:
   * set the environment variables `CONTENTFUL_MANAGEMENT_TOKEN` and `CONTENTFUL_SPACE_ID`
   * `yarn migrate:contentful`
   * Check out "Content model" in the contentful space (you may need to refresh the page)
   * Add "Content"
5. Add localizations

