const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api"
    : "https://api.negociosdelbarrio.com/api";
export default url;
