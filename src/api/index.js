const ACCESS_KEY = "0JAmzZVJyubtfw7zhDNONzm5pFpm4p5bB0m0tlnrO9s";
import axios from "axios";
export function fetchImages() {
  return axios.get("https://api.unsplash.com/photos", {
    params: { per_page: 15 },
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  })
}


