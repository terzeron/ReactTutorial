import fetch from "node-fetch";

async function getData() {
    fetch("https://www.nhncloud.com/homepage/v1/geoip")
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('Error fetching data:', err));
}

await getData();