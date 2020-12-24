import React, { useEffect, useState } from "react";

import Alert from "@material-ui/lab/Alert";

import Axios from "axios";
import url from "../../../url/url";
import NoLoggedView from "../../NoLoggedView";
import useAxios from "../../myHooks/useAxios";
import VerticalStepper from "../../moleculas/VerticalStepper";
import { useUser } from "../../../context/userContext";
import { uploadImage } from "../../../utils/uploadImage";
import { useHistory, useParams } from "react-router-dom";
import { getAdvert } from "../../../utils/adverts";
export default function NewAdvert(props) {
  const [token, setToken] = useState(localStorage.getItem("access-token"));
  const { isLogged } = useUser();
  const history = useHistory();
  const params = useParams();

  let PageTitle = "Nuevo anuncio";
  if (params.id) PageTitle = "Editar Anuncio";

  useEffect(() => {
    if (params.id) {
      getAdvert(params.id)
        .then((res) => setAdvert(res.data.advert))
        .catch((err) => console.log(err));
    }
    /* if (params.id) {
      console.log(`${url}/editar/${params.id}`);
      Axios.get(`${url}/adverts/editar/${params.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "access-token": token,
        },
      })
        .then((res) => {
          const {
            title,
            description,
            barrio,
            image,
            labels,
            contacts,
            backgroundColor,
            location,
            address,
          } = res.data.advert;
          setAdvert(res.data.advert);
          setForm({
            ...form,
            title,
            description,
            state: barrio.state,
            barrio: barrio.name,
            image,
            backgroundColor,
            location,
            address,
            contacts,
          });
          setContacts(contacts);
          setLabelsSelected(labels);
        })
        .catch((err) => console.log(err));
    } */
  }, [params.id]);
  const [advert, setAdvert] = useState(null);
  console.log(advert);
  //console.log("isLogged", !!isLogged);
  //const isLogged = isAuthenticated();
  const { data } = useAxios(url + "/barrios");
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
  const handleDeleteChip = (chipToDelete) => () => {
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

  async function updateAdvert(body) {
    let config = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "access-token": token,
      },
      data: body,
    };
    const res = await Axios(`${url}/adverts/${advert._id}`, config);
    console.log(res);
    setTimeout(() => {
      window.location.href("/perfil");
    }, 1500);
    return res;
  }

  const handleSubmit = async () => {
    const uploadedImage = await uploadImage(form.image?.url);
    const body = {
      ...form,
      contacts,
      image: { src: uploadedImage.data.image?.imageURL },
      labels: labelsSelected,
      // no estoy muy seguro de que esto se guarde
      styles: { backgroundColor: form.backgroundColor },
    };

    //arreglando el nombre debarrio
    const barrioDetails = data?.barrios?.filter(
      (barrio) => barrio.name === form.barrio
    );
    body.barrio = barrioDetails[0];
    console.log("body", body);
    if (advert) {
      const updatedAdevet = updateAdvert(body);
      console.log(updatedAdevet);
      return;
    }
    try {
      setStatus({ ...status, loading: true });

      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "access-token": token,
        },
        data: body,
      };
      let res = await Axios(`${url}/adverts`, config);

      if (!res.data.ok) {
        setStatus({
          status,
          loading: false,
          messageError: <Alert severity="error">{res.data.message} </Alert>,
        });
      } else {
        console.log("response ok", res.data.ok);
        setToken(res);
        setStatus({
          status,
          loading: false,
          messageError: <Alert severity="success">{res.data.message} </Alert>,
        });
        setTimeout(() => {
          history.push("/perfil");
        }, 1500);
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

  const [contacts, setContacts] = useState(form?.contacts || []);

  console.log(advert);
  console.log(labelsSelected);
  console.log(contacts);
  return (
    <>
      {isLogged ? (
        <VerticalStepper
          advert={advert}
          PageTitle={PageTitle}
          setImage={setImage}
          data={data}
          form={form}
          contacts={contacts}
          setContacts={setContacts}
          submiting={status.loading}
          handleDeleteChip={handleDeleteChip}
          labelsSelected={labelsSelected}
          labelDisabled={labelDisabled}
          hanldeAddToLabelList={hanldeAddToLabelList}
          message={status.messageError}
          handleChange={handleChange}
          onSubmit={handleSubmit}
          stateList={stateListCleaned}
          barriosList={barriosList}
        />
      ) : (
        <NoLoggedView text={PageTitle} />
      )}
    </>
  );
}
