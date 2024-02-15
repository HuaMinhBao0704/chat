export function extractDateTime(dateString) {
  const date = new Date(dateString);
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);
  const formattedDateTime = formatDateTime(date);

  return {
    date: formattedDate,
    time: formattedTime,
    dateTime: formattedDateTime
  };
}

// Helper function to format date as "DD-MM-YYYY"
function formatDate(date) {
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Helper function to format time as "HH:MM"
function formatTime(date) {
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

// Helper function to format date and time as "DD-MM-YYYY HH:MM"
function formatDateTime(date) {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);
  return `${formattedDate} ${formattedTime}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, '0');
}
