export async function populateWeatherData() {
  const response = await fetch("api/weatherforecast");
  if (response.ok) {
    return await response.json();
  }
}
