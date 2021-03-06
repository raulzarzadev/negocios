import React, { useEffect, useState } from "react";

import NoLoggedView from "../../NoLoggedView";
import VerticalStepper from "../../moleculas/VerticalStepper";
import { useUser } from "../../../context/userContext";
import { uploadImage } from "../../../utils/uploadImage";
import { useHistory, useParams } from "react-router-dom";
import { getAdvert, postAdvert, updateAdvert } from "../../../utils/adverts";
import Loading from "../../atomos/Loading";

export default function NewAdvert() {
  const history = useHistory();
  const params = useParams();
  const [toEdit] = useState(!!params.id);
  const { isLogged } = useUser();
  const [pageTitle, setPageTitle] = useState("Nuevo Anucnio");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [advert, setAdvert] = useState({});

  useEffect(() => {
    if (toEdit) {
      setPageTitle("Editar Anuncio");
      getAdvert(params.id)
        .then((res) => {
          setAdvert(res.data.advert);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [params.id, toEdit]);

  const handleChange = (e) => {
    setAdvert({ ...advert, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    let imageSrc = advert?.image?.src || "";
    try {
      if (newImage) {
        const {
          data: { image },
        } = await uploadImage(newImage);
        imageSrc = image.imageURL;
      }
      toEdit
        ? await updateAdvert(advert._id, {
            ...advert,
            image: { src: imageSrc },
          })
        : await postAdvert({
            ...advert,
            image: { src: imageSrc },
          });
      history.push("perfil");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  //TODO cuando carga editas anucnio sin tokcar imagen se borra la anteriaor

  const setImage = async (e) => {
    setNewImage(e.target.files[0]);
    setAdvert({
      ...advert,
      image: {
        src: URL.createObjectURL(e.target.files[0]),
      },
    });
  };

  if (loading) return <Loading />;

  return (
    <>
      {isLogged ? (
        <VerticalStepper
          PageTitle={pageTitle}
          advert={advert}
          setAdvert={setAdvert}
          setImage={setImage}
          contacts={advert?.contacts}
          loading={loading}
          handleChange={handleChange}
          onSubmit={handleSubmit}
        />
      ) : (
        <NoLoggedView text={pageTitle} />
      )}
    </>
  );
}
