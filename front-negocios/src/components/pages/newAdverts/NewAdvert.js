import React, { useEffect, useState } from "react";

import NoLoggedView from "../../NoLoggedView";
import VerticalStepper from "../../moleculas/VerticalStepper";
import { useUser } from "../../../context/userContext";
import { uploadImage } from "../../../utils/uploadImage";
import { useParams } from "react-router-dom";
import { getAdvert, postAdvert, updateAdvert } from "../../../utils/adverts";

export default function NewAdvert(props) {
  const params = useParams();
  const { isLogged } = useUser();
  const [advert, setAdvert] = useState(null);
  const [newAdvert, setNewAdvert] = useState({});
  const [pageTitle, setPageTitle] = useState("Nuevo Anucnio");
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState(null);

  console.log(pageTitle);
  console.log(!!params.id);

  useEffect(() => {
    if (!!params.id) {
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
  }, [params.id]);

  const handleChange = (e) => {
    console.log(e.target);
    if (advert) {
      setAdvert({ ...advert, [e.target.name]: e.target.value });
    } else {
      setNewAdvert({ ...advert, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    async function upImage() {
      console.log(newImage.url);
      const { data } = await uploadImage(newImage.url);
      console.log(data);
      return data.image;
    }
    if (newImage) {
      const image = upImage();
      console.log(image);
    }

    if (advert) {
      console.log(advert);
      updateAdvert(advert._id, advert)
        .then((res) => {
          setLoading(false);
          console.log(res);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      postAdvert(newAdvert)
        .then((res) => {
          setLoading(false);
          console.log(res);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const setImage = (e) => {
    setNewImage({
      src: URL.createObjectURL(e.target.files[0]),
      url: e.target.files[0],
    });
  };

  useEffect(() => {
    setAdvert({ ...advert, image: newImage });
  }, [newImage]);

  if (loading) return "loading...";

  console.log(advert, newAdvert);

  return (
    <>
      {isLogged ? (
        <VerticalStepper
          PageTitle={pageTitle}
          advert={advert || newAdvert}
          setAdvert={advert ? setAdvert : setNewAdvert}
          setImage={setImage}
          contacts={advert?.contacts || newAdvert?.contacts}
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
