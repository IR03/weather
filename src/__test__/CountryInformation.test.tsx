import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import CountryInformation from "../Pages/CountryInformation";

import * as API from "../Api/GetData";

describe("CountryInformation Component Testing", () => {

    test('render CountryInformation Component', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <CountryInformation />
            </Router>
        );

        const findText = screen.getByTestId("countryInfo");
        expect(findText).toBeInTheDocument();
    });



    const mockCountryInfo = {
        capital: 'Washington, D.C.',
        population: 329484123,
        latlng: [38, -97]
    };

    test('Load CountryInformation & Test Api', async () => {

        jest.spyOn(API, "getCountryInfo").mockImplementation(() => {
            return Promise.resolve(
                [mockCountryInfo]
            );
        })

        const data = await API.getCountryInfo('usa');
        expect(data).toBeDefined();
        expect(data[0].capital).toBe(mockCountryInfo.capital);
        expect(data[0].population).toBe(mockCountryInfo.population);
        expect(data[0].latlng).toBe(mockCountryInfo.latlng);
    });

    const mockWeatherInfo = {
        temperature: 27,
        precip: 0,
        wind_speed: 24
    }

    test('Load WeatherInformation & Test Api', async () => {

        jest.spyOn(API, "getWeatherInfo").mockImplementation(() => {
            return Promise.resolve(
                mockWeatherInfo
            );
        });

        const data = await API.getWeatherInfo('Washington, D.C.');
        expect(data).toBeDefined();
        expect(data.temperature).toBe(mockWeatherInfo.temperature);
        expect(data.precip).toBe(mockWeatherInfo.precip);
        expect(data.wind_speed).toBe(mockWeatherInfo.wind_speed);
    });

})