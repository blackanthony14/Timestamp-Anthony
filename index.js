const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));

// Servir el archivo HTML desde el mismo directorio que app.js
app.use(express.static(__dirname));

app.get('/timestamp', (req, res) => {
  const currentTimestamp = new Date();
  const utcTimestamp = currentTimestamp.toUTCString();

  res.json({utc: utcTimestamp });
});

// Endpoint for the course test
const isInvalidDate = (date) => date.toUTCString() === "Invalid Date"

app.get("/api/:date", function(req, res){
  const { date } = req.params;
  if (!date) {
    // If date is empty, return the current time
    const currentTime = new Date();
    res.json({
      unix: currentTime.getTime(),
      utc: currentTime.toUTCString(),
    });
  } else {
    let inputDate;
    // Check if the date is a valid Unix timestamp (numeric value)
    if (!isNaN(date)) {
      inputDate = new Date(parseInt(date));
    } else {
      inputDate = new Date(date);
    }
    if (isNaN(inputDate.getTime())) {
    // If the input cannot be parsed as a valid date, return the error message
    res.json({ error: 'Invalid Date' });
  } else {
    // If the input date is valid, return the Unix timestamp and UTC format
    res.json({
      unix: inputDate.getTime(),
      utc: inputDate.toUTCString(),
    });
    }
  }
});


app.get("/api/", function(req,res){
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
});

// Just bring up the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
