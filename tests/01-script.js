import http from "k6/http";

export default function () {
  http.get("https://www.google.com/");
}

// k6 run --vus 10 --duration 5s
