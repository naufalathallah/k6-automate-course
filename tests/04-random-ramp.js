import http from "k6/http";

export let options = {
  stages: [
    { duration: "3s", target: 5 },
    { duration: "5s", target: 3 },
    { duration: "6s", target: 0 },
  ],
  vus: 10,
};

export default function () {
  http.get("https://www.google.com/");
  http.get("https://www.wikipedia.com/");
  http.get("https://www.api.nscreativestudio.com/");
}

// k6 run --vus 10 --duration 5s
