import http from "k6/http";
import { check } from "k6";

export default function () {
  let res = http.get(
    "https://run.mocky.io/v3/8fc07b7f-f228-4f41-ad9e-e1091dc52e31"
  );

  check(res, {
    "response code was 200": (res) => res.status == 200,
  });
}
