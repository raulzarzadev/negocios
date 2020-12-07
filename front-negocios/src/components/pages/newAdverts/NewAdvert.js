import React, { useEffect, useState } from "react";

import Alert from "@material-ui/lab/Alert";

import Axios from "axios";

import url from "../../../url/url";
import { isAuthenticated } from "../../../utils/user";
import NoLoggedView from "../../NoLoggedView";
import useAxios from "../../myHooks/useAxios";
import VerticalStepper from "../../moleculas/VerticalStepper";

export default function NewAdvert(props) {
  const isLogged = isAuthenticated();
  const { data,  } = useAxios(url + "/barrios");
  const [token, setToken] = useState(localStorage.getItem("access-token"));
  const [status, setStatus] = useState({
    loading: false,
    messageError: "",
    error: null,
  });
  const [form, setForm] = useState({
    title: "Titulo",
    description: "Descripcion",
    price: 25,
    //styles: {},
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e?.target?.name]: e?.target?.checked || e?.target?.value,
    });
  };
  const handleDelete = (chipToDelete) => () => {
    if (labelsSelected.length <= 3) setLabelDisabled(false);
    setLabelsSelected((chips) =>
      chips?.filter((chip) => chip?.key !== chipToDelete?.key)
    );
  };
  const hanldeAddToLabelList = (newLabel) => {
    if (labelsSelected.length >= 2) {
      setLabelDisabled(true);
    }
    setLabelsSelected([...labelsSelected, newLabel]);
  };
  const [labelDisabled, setLabelDisabled] = useState();

  const [labelsSelected, setLabelsSelected] = useState([]);

  useEffect(() => {
    if (!!labelsSelected) {
      setForm({ ...form, labels: labelsSelected });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelsSelected]);

  const handleSubmit = async () => {
    console.log("subbmited");
    const body = {
      ...form,
      image: newImage,
      labels: labelsSelected,
      styles: { backgroundColor: form.backgroundColor }, // no estoy muy seguro de que esto se guarde
    };
    const barrioDetails = data?.barrios?.filter(
      (barrio) => barrio.name === form.barrio
    );
    body.barrio = barrioDetails[0];
    setStatus({
      ...status,
      loading: true,
    });
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "access-token": token,
        },
        data: body,
      };
      console.log(body);

      let res = await Axios(`${url}/adverts`, config);
      console.log("peticion recibida", res);

      if (!res.data.ok) {
        console.log("peticion rechazada", res);
        setStatus({
          status,
          loading: false,
          messageError: <Alert severity="error">{res.data.message} </Alert>,
        });
      } else {
        console.log("peticion aceptada recuperando token", res.data);

        setToken(res);
        setStatus({
          status,
          loading: false,
          messageError: <Alert severity="success">{res.data.message} </Alert>,
        });
        props.history.push("/perfil");
      }
    } catch (error) {
      console.log("error capturado", error);
      setStatus({
        loading: false,
        messageError: <Alert severity="error">Error </Alert>,
        error,
      });
    }
  };

  const [barriosList, setBarriosList] = useState([]);

  const stateList = data?.barrios?.map((barrio) => barrio.state);
  const stateListCleaned = [...new Set(stateList)];

  useEffect(() => {
    const arr = [];
    if (form?.state) {
      data.barrios.map((barrio) => {
        if (barrio.state === form?.state) {
          arr.push(barrio.name);
        }
        return 0;
      });
    }
    setBarriosList(arr);
  }, [data, form?.state]);

  const [newImage, setNewImage] = useState(null);
  const setImage = (e) => {
    console.log(e.target.files[0]);
  
    setNewImage({
      src: URL.createObjectURL(e.target.files[0]),
      url: e.target.files[0],
    });
    setForm({ ...form, image: newImage });
  };

  useEffect(() => {
    setForm({ ...form, image: newImage });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newImage]);

  console.log(form);
  return (
    <>
      {isLogged ? (
        <VerticalStepper
          data={data}
          setImage={setImage}
          handleDelete={handleDelete}
          labelsSelected={labelsSelected}
          labelDisabled={labelDisabled}
          hanldeAddToLabelList={hanldeAddToLabelList}
          message={status.messageError}
          form={form}
          handleChange={handleChange}
          onSubmit={handleSubmit}
          stateList={stateListCleaned}
          barriosList={barriosList}
        />
      ) : (
        <NoLoggedView text="anuncio" />
      )}
    </>
  );
}
