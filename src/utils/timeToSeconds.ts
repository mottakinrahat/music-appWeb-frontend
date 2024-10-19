// Utility function to convert time string (HH:MM:SS) to total seconds
function timeToSeconds(time: any) {
  const parts = time.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);

  return hours * 3600 + minutes * 60 + seconds;
}

// Export the function for use in other modules
export default timeToSeconds;
