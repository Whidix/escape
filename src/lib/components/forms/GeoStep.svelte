<script lang="ts">
  import { onMount } from "svelte";

  export let data;

  const target = data.step.geo.split(",");

  onMount(() => {
    const compassCircle = document.querySelector(".compass-circle") as HTMLElement;
    const myPoint = document.querySelector(".my-point") as HTMLElement;
    const startBtn = document.querySelector(".start-btn") as HTMLElement;
    let compass;
    const isIOS =
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
      navigator.userAgent.match(/AppleWebKit/);

    function init() {
      startBtn.addEventListener("click", startCompass);
      navigator.geolocation.getCurrentPosition(locationHandler);

      if (!isIOS) {
        window.addEventListener("deviceorientationabsolute", handler, true);
      }
    }

    function startCompass() {
      if (isIOS) {
        DeviceOrientationEvent.requestPermission()
          .then((response) => {
            if (response === "granted") {
              window.addEventListener("deviceorientation", handler, true);
            } else {
              alert("has to be allowed!");
            }
          })
          .catch(() => alert("not supported"));
      }
    }

    function handler(e) {
      compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
      compassCircle.style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;

      // ±15 degree
      if (
        (pointDegree < Math.abs(compass) &&
          pointDegree + 15 > Math.abs(compass)) ||
        pointDegree > Math.abs(compass + 15) ||
        pointDegree < Math.abs(compass)
      ) {
        myPoint.style.opacity = "0";
      } else if (pointDegree) {
        myPoint.style.opacity = "1";
      }
    }

    let pointDegree: number;

    function locationHandler(position: { coords: { latitude: number; longitude: number } }) {
      const { latitude, longitude } = position.coords;
      pointDegree = calcDegreeToPoint(latitude, longitude);
    }

    function calcDegreeToPoint(latitude: number, longitude: number) {
      const point = {
        lat: target[0],
        lng: target[1],
      };

      const phiK = (point.lat * Math.PI) / 180.0;
      const lambdaK = (point.lng * Math.PI) / 180.0;
      const phi = (latitude * Math.PI) / 180.0;
      const lambda = (longitude * Math.PI) / 180.0;
      const psi =
        (180.0 / Math.PI) *
        Math.atan2(
          Math.sin(lambdaK - lambda),
          Math.cos(phi) * Math.tan(phiK) -
            Math.sin(phi) * Math.cos(lambdaK - lambda)
        );
      console.log(psi)
      return Math.round(psi);
    }

    init();
  });
</script>

<div class="compass">
  <div class="arrow"></div>
  <div class="compass-circle"></div>
  <div class="my-point"></div>
</div>
<button class="start-btn">Start compass</button>

<style>
  .compass {
  position: relative;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  margin: auto;
}

.compass > .arrow {
  position: absolute;
  width: 0;
  height: 0;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  border-style: solid;
  border-width: 30px 20px 0 20px;
  border-color: red transparent transparent transparent;
  z-index: 1;
}

.compass > .compass-circle,
.compass > .my-point {
  position: absolute;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out;
  background: url(https://cdn.onlinewebfonts.com/svg/img_467023.png) center
    no-repeat;
  background-size: contain;
}

.compass > .my-point {
  opacity: 0;
  width: 20%;
  height: 20%;
  background: rgb(8, 223, 69);
  border-radius: 50%;
  transition: opacity 0.5s ease-out;
}
</style>