import React, { useEffect, useState } from "react";
import StateList from "../pages/StateList";
import Loading from "../atomos/Loading";
import { getAllBarrios, getPublishedAdverts } from "../../utils/adverts";
import { includes } from "../../helpres";

export default function BarriosList() {
  const [loading, setLoading] = useState(true);
  const [barrios, setBarrios] = useState([]);
  const statesList = [];

  useEffect(() => {
    getAllBarrios()
      .then((res) => {
        setBarrios(res.data.barrios);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    getPublishedAdverts()
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  barrios.map(
    (barrio) =>
      !includes(statesList, barrio.stateData) &&
      statesList.push(barrio.stateData)
  );
  //console.log(statesList);

  const barriosByState = statesList.map((state) => {
    let barriosByState = [];
    barrios.map(
      (barrio) => barrio.state === state.tag && barriosByState.push(barrio)
    );
    return { ...state, barrios: barriosByState };
  });

  if (loading) return <Loading />;

  return <StateList barrios={barriosByState} />;
}
