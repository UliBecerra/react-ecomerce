import axios from "axios";

export const axiosEcomerce = axios.create({
  baseURL:'https://e-commerce-api-v2.academlo.tech/api/v1/'
})
export const getCongig = () =>{
  return {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("userInfo"))?.token,
    },
  }
}