const url =
  process.env.REACT_APP_ENVIROMENT === "dev"
    ? "http://localhost:3001/api"
    : "https://api.negociosdelbarrio.com/api";
export default url;
