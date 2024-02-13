import http from "k6/http";
import { check } from "k6";

export let options = {
  vus: 5,
  duration: "2s",
};

export default function () {
  let res = http.get(
    "https://run.mocky.io/v3/be3916fc-6347-4ac4-8bcb-9f40c4b3d158"
  );

  console.log(
    `response body length ${res.body.length} for VU= ${__VU} ITER= ${__ITER}`
  );

  check(res, {
    "response code was 200": (res) => res.status == 200,
    "body size was 43 bytes": (res) => res.body.length == 43,
  });
}
