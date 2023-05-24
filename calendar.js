const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const monthYear = document.getElementById('month-year');
const calendarBody = document.getElementById('calendar-body');
const eventsContainer = document.getElementById('events-container');

// Event data (replace with your own data)
    async function getFile(){
      const response = await fetch('data.json')
      const events = await response.json()
      window.alert(events);
    }

  getFile().then
  // Add more events...

// Display calendar for the current month
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
renderCalendar(currentMonth, currentYear);

// Event listeners for navigation buttons
prevBtn.addEventListener('click', () => {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  renderCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener('click', () => {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  renderCalendar(currentMonth, currentYear);
});

// Render the calendar for the given month and year
function renderCalendar(month, year) {
  // Clear previous calendar
  calendarBody.innerHTML = '';

  // Update month and year display
  monthYear.textContent = `${getMonthName(month)} ${year}`;

  // Calculate the number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Calculate the day of the week of the first day
  const firstDay = new Date(year, month, 1).getDay();

  // Generate calendar days
  let datex = 1;
  for (let row = 0; row < 6; row++) {
    const newRow = calendarBody.insertRow();

    for (let col = 0; col < 7; col++) {
      if (row === 0 && col < firstDay) {
        // Add empty cells before the first day of the month
        newRow.insertCell();
      } else if (datex > daysInMonth) {
        // Stop adding cells after the last day of the month
        break;
      } else {
        // Add calendar day cells
        const newCell = newRow.insertCell();
        newCell.setAttribute('id', datex)
        newCell.setAttribute('class', 'cell');
        newCell.textContent = datex;
        datex++;
      }
    }
  }
var c = document.getElementsByClassName('cell');
for(var i =0; i<c.length; i++){
  var id = c[i].getAttribute('id');
  document.getElementById(id).addEventListener('click', (e) => {
  displayEvents(new Date(year, month, e.target.id).toLocaleDateString());
})}
}
    var t = document.createElement('table');
    t.setAttribute('id', 'modal-table');
// Display events for the given date
function displayEvents(date) {
  // Clear previous events
  var modal = document.getElementById('modal');
  modal.style.display = 'block';
  var content = document.getElementById('content');
  t.innerHTML = '';
  var row = document.createElement('tr');
  var th = document.createElement('th');
  th.setAttribute('class', 'head');
  row.setAttribute('id', 'firstRow')
  th.textContent = date;
  row.appendChild(th)
  t.appendChild(row);
  content.appendChild(t);

  // Filter events for the given date
  const filteredEvents = events.filter(event =>
    isSameDay(new Date(event.date).toLocaleDateString(), date)
  );

  // Display events
  if (filteredEvents.length === 0) {
    var rw = document.createElement('tr');
    const noEventElement = document.createElement('td');
    noEventElement.textContent = "No Events"
    rw.appendChild(noEventElement)
    t.appendChild(rw)
    content.appendChild(t);
  } else {
    filteredEvents.forEach(event => {
      var rw = document.createElement('tr');
      rw.setAttribute('class', 'row');
      const eventElement = document.createElement('td');
      eventElement.setAttribute('class', 'c1')
      eventElement.textContent = event.title;
      rw.appendChild(eventElement)
      const eventElement2 = document.createElement('td');
      eventElement2.setAttribute('class', 'c2')
      eventElement2.textContent = event.time;
      rw.appendChild(eventElement2)
      const eventElement3 = document.createElement('td');
      eventElement3.setAttribute('class', 'c3')
      eventElement3.textContent = event.details;
      rw.appendChild(eventElement3)
      t.appendChild(rw)
      content.appendChild(t)
    });
  }
  var clsbtn = document.getElementById('close');
clsbtn.addEventListener('click', () => {
  modal.style.display = 'none'
})
}



// Utility functions

function getMonthName(month) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
}

function isSameDay(date1, date2) {
  return (
    date1 === date2
  );
}
