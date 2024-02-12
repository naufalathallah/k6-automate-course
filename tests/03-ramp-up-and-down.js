import http from "k6/http";

export let options = {
  stages: [
    { duration: "3s", target: 5 },
    { duration: "5s", target: 3 },
  ],
};

export default function () {
  http.get("https://www.google.com/");
}

// k6 run --vus 10 --duration 5s
