import React, { useEffect, useState } from "react";

import Alert from "@material-ui/lab/Alert";

import Axios from "axios";
import url from "../../../url/url";
import NoLoggedView from "../../NoLoggedView";
import useAxios from "../../myHooks/useAxios";
import VerticalStepper from "../../moleculas/VerticalStepper";
import { useUser } from "../../../context/userContext";
import { uploadImage } from "../../../utils/uploadImage";
import { useParams } from "react-router-dom";
import { getAdvert, postAdvert } from "../../../utils/adverts";
export default function NewAdvert(props) {
  const { isLogged } = useUser();
  const [advert, setAdvert] = useState(null);
  const [newAdvert, setNewAdvert] = useState({});
  const [pageTitle, setPageTitle] = useState("Nuevo Anucnio");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setPageTitle("Editar Anuncio");
      getAdvert(params.id)
        .then((res) => setAdvert(res.data.advert))
        .catch((err) => console.log(err));
    }
  }, [params.id]);

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

  const handleSubmit = async () => {
    const uploadedImage = await uploadImage(form.image?.url);
 

    
    try {
      setStatus({ ...status, loading: true });

      postAdvert(advert)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("error capturado", error);
      setStatus({
        loading: false,
        messageError: <Alert severity="error">Error </Alert>,
        error,
      });
    }
  };

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
          PageTitle={pageTitle}
          advert={advert}
          setImage={setImage}
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
        />
      ) : (
        <NoLoggedView text={pageTitle} />
      )}
    </>
  );
}
