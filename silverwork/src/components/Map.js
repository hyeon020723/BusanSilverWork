import React, { useEffect } from "react";

function Map() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

        // 지도를 생성합니다.
        new window.kakao.maps.Map(mapContainer, mapOption);
      });
    };

    return () => document.head.removeChild(script);
  }, []);

  return <div id="map" style={{ width: "100%", height: "350px" }}></div>;
}

export default Map;
