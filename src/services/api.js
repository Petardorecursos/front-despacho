import axios from 'axios';

// URLs actualizadas con tus nuevos Load Balancers de AWS
const URL_VENTAS = "http://a3f5e82467a7f44489a04b488bee868f-257877838.us-east-1.elb.amazonaws.com:8080";
const URL_DESPACHOS = "http://a38705f70e11b4be294e4b8e9252b90d-1385445269.us-east-1.elb.amazonaws.com:8080";

export const apiVentas = axios.create({
  baseURL: URL_VENTAS,
  headers: { 'Content-Type': 'application/json' },
});

export const apiDespacho = axios.create({
  baseURL: URL_DESPACHOS,
  headers: { 'Content-Type': 'application/json' },
});
