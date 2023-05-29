const ApiKey = "7280a52083f88d3851a308e59052e7a5";
const makeIconUrl = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

const getWeatherDataFormatted = async (city, units = "matric") => {
    URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=${units}`;

    const data = await fetch(URL)
        .then((response) => response.json())
        .then((data) => data);
    const
        {
            weather,
            main: { temp, temp_max, temp_min, feels_like, humidity, pressure },
            sys: { country },
            wind: { speed },
            name,
        } = data;

    const { description, icon } = weather[0];
    return {
        description, iconUrl:makeIconUrl(icon), temp, temp_max, temp_min, feels_like, humidity, pressure, country, speed, name
    };
};
export { getWeatherDataFormatted }