import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MySelectInput from "../atomos/MySelectInput";
import { ESTADOS_LABEL_MX } from "../../HardData/ESTADOS_MX";
import { getAllBarrios } from "../../utils/adverts";

export default function ToPublishAdvert() {
  const [states] = useState(ESTADOS_LABEL_MX || []);
  const [state, setState] = useState("");
  const [barrios, setBarrios] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllBarrios().then((res) => {
      setBarrios(res.data.barrios);
      setLoading(false);
    });
  }, []);
  const handleChange = (e) => {
    setState(e.target.value);
  };
  console.log(barrios);
  console.log(state);
  useEffect(() => {
    const arr = [];
    if (state) {
      barrios.map((barrio) => {
        if (barrio.state === state) {
          arr.push(barrio.name);
        }
        return 0;
      });
    }
    setBarrios(arr);
  }, []);

  return (
    <div>
      <Typography>¿Donde prefieres publicar tu anuncio?</Typography>
      <Box my={2}>
        <MySelectInput
          name="state"
          label="Estado"
          placeholder="Selecciona un Estado"
          options={states}
          onChange={handleChange}
        />
      </Box>
      {loading ? (
        "Cargando..."
      ) : (
        <Box>
          <MySelectInput
            name="barrio"
            label="Barrio"
            placeholder="Selecciona un Barrio"
            options={barrios}
            onChange={handleChange}
          />
        </Box>
      )}
    </div>
  );
}
