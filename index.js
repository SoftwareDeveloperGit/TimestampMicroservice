// Import Express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Helper function to format a valid date
function getDateResponse(date) {
  return {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };
}

// Define the API route
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  // If no date is provided, return current time
  if (!dateParam) {
    const currentDate = new Date();
    return res.json(getDateResponse(currentDate));
  }

  // Try parsing the provided date
  let date;
  if (/^\d{5,}$/.test(dateParam)) {
    // If the parameter is numeric (Unix timestamp), create a Date object
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise, try to parse the string as a date
    date = new Date(dateParam);
  }

  // If the date is invalid, return an error message
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return the date response
  return res.json(getDateResponse(date));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
