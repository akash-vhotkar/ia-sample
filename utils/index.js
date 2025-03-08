
function extractWeatherData(data) {

    if (!data?.metadata?.stations || !data?.items?.[0]?.readings) {
        console.error("Invalid data format.");
        return [];
    }

    const stations = data.metadata.stations;
    const readings = data.items[0].readings;

    const readingsMap = new Map(readings.map(r => [r.station_id, r.value]));

    return stations.map(({ id, name, location: { latitude, longitude } }) => ({
        name,
        latitude,
        longitude,
        temperature: readingsMap.get(id) || null
    }));
}

module.exports = { extractWeatherData };
