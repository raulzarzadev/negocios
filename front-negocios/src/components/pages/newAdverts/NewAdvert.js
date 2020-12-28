import React, { useEffect, useState } from "react";

import NoLoggedView from "../../NoLoggedView";
import VerticalStepper from "../../moleculas/VerticalStepper";
import { useUser } from "../../../context/userContext";
import { uploadImage } from "../../../utils/uploadImage";
import { useParams } from "react-router-dom";
import { getAdvert, postAdvert, updateAdvert } from "../../../utils/adverts";

export default function NewAdvert() {
  const params = useParams();
  const [toEdit] = useState(!!params.id);
  const { isLogged } = useUser();
  const [pageTitle, setPageTitle] = useState("Nuevo Anucnio");
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState(null);

  const [advert, setAdvert] = useState({});

  useEffect(() => {
    if (toEdit) {
      setLoading(true);
      setPageTitle("Editar Anuncio");
      getAdvert(params.id)
        .then((res) => {
          setLoading(false);
          setAdvert(res.data.advert);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    setLoading(false);
  }, [params.id, toEdit]);

  const handleChange = (e) => {
    setAdvert({ ...advert, [e.target.name]: e.target.value });
  };

  const redirectToProfile = () => {
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/perfil";
    }, 300);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let imageSrc = advert.image || "";
      if (newImage) {
        const {
          data: { image },
        } = await uploadImage(newImage);
        imageSrc = image.imageURL;
      }
      const res = toEdit
        ? await updateAdvert(advert._id, {
            ...advert,
            image: { src: imageSrc },
          })
        : await postAdvert({
            ...advert,
            image: { src: imageSrc },
          });
      console.log(res);
      redirectToProfile();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const setImage = async (e) => {
    setNewImage(e.target.files[0]);
    setAdvert({
      ...advert,
      image: {
        src: URL.createObjectURL(e.target.files[0]),
      },
    });
  };

  if (loading) return "loading...";

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
