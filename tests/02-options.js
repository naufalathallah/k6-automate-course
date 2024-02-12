import http from "k6/http";

export let options = {
  vus: 10,
  duration: "5s",
};

export default function () {
  http.get("https://www.google.com/");
}

// k6 run --vus 10 --duration 5s
