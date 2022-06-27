import { LoadingButton } from "@mui/lab";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getCountryInfo, getWeatherInfo } from "../Api/GetData";

interface countryProps {
    capital: string[],
    name: {
        common: string[],
    }
    population: number,
    latlng: number[],
    flags: {
        png: string;
    }
}

type InitParamsProps = {
    country: string
}

interface countryProps {
    capital: string[],
    name: {
        common: string[],
    }
    population: number,
    latlng: number[],
    flags: {
        png: string;
    }
}

interface weatherProps {

    temperature: number,
    precip: number;
    wind_speed: number;
    weather_icons: string[];

}

const CountryInformation: React.FC = () => {

    const { country } = useParams<InitParamsProps>();

    const [countryInfo, setCountryInfo] = useState<countryProps>();
    const [error, setError] = useState<boolean>(false);
    const [weatherInfo, setWeatherInfo] = useState<weatherProps>();
    const [weatherLoading, setWeatherLoading] = useState<boolean>(false);

    // console.log(countryInfo);
    // console.log(weatherInfo);
 



    useEffect(() => {
        callCountry();
    }, [country]);

    const callCountry = async () => {
        try {
            const data = await getCountryInfo(country);
            const countryInfoData = data[0];
            const statusData = data[1];

            if (statusData === 200) {
                setCountryInfo(countryInfoData[0]);
            }
            else {
                setError(true)

            }

        }
        catch (err) {
            console.error(err);
        }
    };
    const callWeather = async (capital: string) => {

        try {
            setWeatherLoading(true);
            const data = await getWeatherInfo(capital);
            setWeatherInfo(data);
            setWeatherLoading(false);
        }
        catch (err) {
            setWeatherLoading(false);
            console.error(err);
        }
    };

    return (

        error ?
            <Alert variant="filled" severity="error" >
                Please Enter A Valid Country Name— <strong><Link to='/' style={{ color: 'black', textDecoration: 'none' }}>Try Again !</Link></strong>
            </Alert>
            :
            <Box data-testid="countryInfo">
                {
                    countryInfo ? (
                        <Box my={4}>
                            <Typography variant="h6" my={2} >
                                Country Information : {countryInfo.name.common}
                            </Typography>
                            <Typography variant="body1" component="p">
                                Capital: <strong>{countryInfo.capital[0]}</strong>
                            </Typography>
                            <Typography variant="body1" >
                                Population: <strong>{countryInfo.population}</strong>
                            </Typography>
                            <Typography variant="body1" >
                                Latlng: <strong>{JSON.stringify(countryInfo.latlng)}</strong>
                            </Typography>
                            <Typography variant="body1">Flag:</Typography>
                            <img src={countryInfo?.flags.png} alt="flag" />


                            {/* weather info */}
                            <Box my={4}>

                                {
                                    weatherInfo && !weatherLoading ?

                                        <Box>
                                            <Typography variant='h6' my={2} textAlign="center">
                                                Wether Information
                                            </Typography>

                                            <Typography
                                                variant="body1"
                                                component="p"
                                            >
                                                Temperature :{" "}
                                                <strong>{weatherInfo.temperature}</strong>
                                            </Typography>
                                            <Typography variant="body1">
                                                Wind Speed: <strong>{weatherInfo.wind_speed}</strong>
                                            </Typography>
                                            <Typography variant="body1" >
                                                Precip: <strong>{weatherInfo.precip}</strong>
                                            </Typography>
                                            <Typography variant="body1">Weather Icons:</Typography>
                                            <img src={weatherInfo.weather_icons[0]} alt="weather_icon" />
                                        </Box>

                                        :
                                        <LoadingButton
                                            onClick={() => callWeather(countryInfo?.capital[0])}
                                            loading={weatherLoading} variant="outlined">
                                            Capital Weather
                                        </LoadingButton>
                                }


                            </Box>
                        </Box>

                    )

                        :
                        <Typography mt={2} variant="h4" component="p">
                            Loading... <CircularProgress />
                        </Typography>
                }
            </Box>
    );
};

export default CountryInformation;