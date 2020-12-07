const url =
  process.env.REACT_APP_ENVIROMENT === "env"
    ? "http://127.0.0.1:4001/api"
    : "https://api.negociosdelbarrio.com/api";
export default url;
