/**
 * Basic API route in Next.js.
 * Returns a JSON response when the route is accessed.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export default function handler(req, res) {
  // When this API route is accessed, I return a JSON object with my name.
  res.status(200).json({ name: "Johan Nunez" });
}

/*
Talking Points:
- This is a simple API route provided by Next.js to demonstrate how server-side functions work within the framework.
- I chose to include my name in the JSON response to personalize the example and make it easy to identify during testing.
- The `req` and `res` objects represent the incoming request and the outgoing response, respectively. I used the `res.status(200).json()` method to send a successful HTTP status code (200) along with a JSON response.
- This route serves as a basic template that I can expand upon for more complex server-side logic in the future, such as handling form submissions or interacting with a database.
- While this example is straightforward, it lays the foundation for understanding how API routes work in Next.js, making it easier to build more advanced backend features as needed.
*/
