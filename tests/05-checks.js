import http from "k6/http";
import { check } from "k6";

export let options = {
  vus: 5,
  duration: "2s",
};

export default function () {
  let res = http.get(
    "https://run.mocky.io/v3/8fc07b7f-f228-4f41-ad9e-e1091dc52e31"
  );

  console.log(
    `response body length ${res.body.length} for VU= ${__VU} ITER= ${__ITER}`
  );

  check(res, {
    "response code was 200": (res) => res.status == 200,
    "body size was 0 bytes": (res) => res.body.length == 0,
  });
}
