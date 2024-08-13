import { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom Document component in Next.js.
 * Used to modify the overall structure of the HTML document.
 *
 * @returns The custom HTML document structure.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* This is where I can add additional meta tags, link external stylesheets, or include external scripts */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

/*
Talking Points:
- The Document component in Next.js allows me to customize the overall structure of the HTML document that wraps around my entire application.
- By using the `Html`, `Head`, `Main`, and `NextScript` components, I ensure that the basic structure required by Next.js is maintained while still giving me the flexibility to add custom elements.
- For example, I can add additional meta tags for SEO, link external CSS files, or include external JavaScript libraries in the `Head` section.
- The `Main` component is where the main content of the page is rendered, and `NextScript` includes any necessary scripts that Next.js needs to function properly.
- Although this component is typically used for global changes that affect all pages, it's an essential part of my application because it helps set up the document-level structure.
- I chose to set the `lang` attribute of the `Html` tag to "en" to indicate that the primary language of the content is English, which is important for accessibility and SEO.
*/
