import WeatherWand from '../components/WeatherWand';
import Footer from '../components/Footer';

/**
 * Home component serves as the main landing page of the Weather Wizard app.
 * It integrates the WeatherWand component and Footer component.
 *
 * @returns The home page layout.
 */
const Home = () => {
  return (
    <div className="home-sanctuary min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-center text-4xl font-bold mb-8">Welcome to Weather Wizardry</h1>
      {/* I chose to place the WeatherWand component at the center of the homepage to make it the focal point */}
      <WeatherWand />
      {/* The Footer component is included at the bottom to provide consistent branding across all pages */}
      <Footer /> 
    </div>
  );
};

export default Home;

/*
Talking Points:
- The Home component is the main landing page of my Weather Wizard app, designed to welcome users and introduce them to the core functionality.
- I centered the content using Tailwind CSS classes like `min-h-screen`, `flex`, `items-center`, and `justify-center` to ensure that the page layout is balanced and visually appealing on all screen sizes.
- The headline "Welcome to Weather Wizardry" sets the tone for the app, aligning with the magical theme I've chosen for the user experience.
- By integrating the WeatherWand component directly into the home page, I ensure that users can immediately interact with the app's primary feature—fetching and displaying weather data.
- The Footer component is included at the bottom of the page to provide consistent branding and closure to the user experience on this page.
- Overall, the Home component is designed to be both welcoming and functional, offering users a seamless introduction to what the Weather Wizard app has to offer.
*/
