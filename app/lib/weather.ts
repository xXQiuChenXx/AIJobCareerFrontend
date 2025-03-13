export async function populateWeatherData() {
  const response = await fetch("weatherforecast");
  if (response.ok) {
    return await response.json();
  }
}
