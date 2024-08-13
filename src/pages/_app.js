import "../styles/globals.css"; // Importing the global styles for the entire application

/**
 * The custom App component in Next.js.
 * It wraps around every page component to apply global styles.
 *
 * @param {Component} Component - The active page component.
 * @param {object} pageProps - The props for the active page.
 * @returns The active page wrapped in the App component.
 */
export default function App({ Component, pageProps }) {
  // By wrapping each page in the App component, I ensure that global styles and any global state
  // or logic can be applied consistently across all pages in my application.
  return <Component {...pageProps} />;
}

/*
Talking Points:
- The App component in Next.js is crucial because it acts as a wrapper for every page in my application, allowing me to apply global styles or logic consistently.
- I import the `globals.css` file here to ensure that all global styles are automatically applied to every page, without needing to import them individually in each page component.
- This setup simplifies managing styles across the application, ensuring a consistent look and feel.
- By using the `Component` and `pageProps` props, Next.js dynamically injects the active page and its respective props, allowing for seamless navigation and rendering of different pages.
- This file is minimal but plays a significant role in maintaining the structure and functionality of the entire application.
*/
