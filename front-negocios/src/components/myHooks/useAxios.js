import { useEffect, useState } from "react";
import Axios from "axios";

const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const axiosResource = async () => {
      try {
        const res = await Axios.get(url, {
          crossdomain: true,
          headers: {
            "Content-Security-Policy":
              "default-src *; style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' stackexchange.com",
          },
        });
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log("err", error);
        setLoading(true);
        setError(error);
      }
    };
    axiosResource();
  }, [url]);

  return { data, loading, error };
};

export default useAxios;
