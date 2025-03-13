import { useEffect, useState } from "react";
import type { Route } from "../+types/root";
import { populateWeatherData } from "@/lib/weather";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Testing Route" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

interface Forecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

const Weather = () => {
  const [data, setData] = useState<Forecast[]>([]);
  useEffect(() => {
    populateWeatherData().then((res) => setData(res));
  }, []);
  const contents =
    data === undefined ? (
      <p>
        <em>
          Loading... Please refresh once the ASP.NET backend has started. See{" "}
          <a href="https://aka.ms/jspsintegrationreact">
            https://aka.ms/jspsintegrationreact
          </a>{" "}
          for more details.
        </em>
      </p>
    ) : (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {data.map((forecast) => (
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <div>
      <h1 id="tableLabel" className="text-3xl font-bold underline">
        Weathers forecast
      </h1>
      <p>This component demonstrates fetching data from the server.</p>
      {contents}
    </div>
  );
};

export default Weather;
