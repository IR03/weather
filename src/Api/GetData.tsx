export const getCountryInfo = async (country: string | undefined) => {

    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const status =await res.status;
    const data = await res.json();
    
    return [data, status];
}

export const getWeatherInfo = async (capital: string | undefined) => {
    
    const res = await fetch(`http://api.weatherstack.com/current?access_key=72f7bbdda792f482bc2c3537bfee9208&query=${capital}`);
    const data = await res.json();
    return data.current;
}