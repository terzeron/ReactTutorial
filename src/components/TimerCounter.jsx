import { useState, useEffect } from "react";

function TimerCounter({ seconds }) {
  const [count, setCount] = useState(0);
  const [country, setCountry] = useState("알 수 없는 국가");

  useEffect(() => {
    async function load() {
        const res = await fetch("https://www.nhncloud.com/homepage/v1/geoip");
        const json = await res.json();
        setCountry(json.country.name);
    }
    load();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, seconds * 1000);

    return () => {
      console.log(`${seconds}초 타이머 정리`);
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <>
        <div>{seconds}초 타이머 설정됨</div>
        <div>카운트: {count}</div>
        <div>현재 국가: {country}</div>
    </>
  );
}

export default TimerCounter;