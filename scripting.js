x = [];
y = [];
avg = 14;

async function getData() {
  const response = await fetch("https://data.cityofnewyork.us/resource/p26e-k6k9.json");
  const data = await response.json();

  // const rows = data.split("\n").slice(1);

  // x = rows.map( r => r.split(",")[0] );
  // y = rows.map( r => Number(r.split(",")[1])+avg );

  const rows = data[39]; // Real (base year 2017) dollars committed to DOE per pupil

  extractData(rows);

  displayData();
}

function extractData(rows) {
  for (const key in rows) {
    
    if (key=="category") {continue;}

    const year = key;
    const dollars = rows[key].substring(5); // Ignore the first 4 characters - they're a dollar sign and some whitespace

    console.log(year);
    console.log(dollars);
  }
}



async function displayData() {
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: x,
      datasets: [{
        label: "Temperature (°C)",
        data: y,
        borderWidth: 3,
        borderColor: "#ff0000",
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

getData();