const User = require("../models/User");
const Advert = require("../models/Advert");

const Verifier = require("email-verifier");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const { sendEmail } = require("../helpers/user.helper");
const InvalidToken = require("../models/InvalidToken");
const { json } = require("express");

//**** host segun envarioment****
const ENVIROMENT = process.env.ENVIROMENT;
console.log("Enviroment:", ENVIROMENT);
const host =
  ENVIROMENT === "dev"
    ? `http://localhost:3000`
    : `http://negociosdelbarrio.com`;

const usersCtrl = {};

usersCtrl.getUser = async (req, res) => {
  const { _id, email, rol, emailConfirmed, credit } = await User.findById(
    req.params.id
  );
  if (emailConfirmed) {
    const adverts = await Advert.find({ owner: req.params.id });
    const setUser = {
      id: _id,
      email,
      rol,
      credit,
      adverts,
    };
    res.json({
      type: "successUser",
      ok: true,
      message: "usuario",
      user: setUser,
    });
  } else {
    res.json({
      type: "notEmailConfirmed",
      ok: false,
      message: "Este email aun no a sido confirmado",
    });
  }
};

usersCtrl.signIn = async (req, res) => {
  const { email, password } = req.body;

  // *** verificando user exist

  const user = await User.findOne(
    { email },
    { credit: 1, email: 1, password: 1, rol: 1, emailConfirmed: 1 }
  );
  if (!user)
    return res.json({
      ok: false,
      message: "inicio de sesion fallo",
      type: "faildSignIn",
    });
  if (!user.emailConfirmed)
    res.json({
      ok: false,
      message: "incio de sesion fallo",
      type: "notEmailConfirmed",
    });

  // *** validando password

  const isPaswordMatch = await user.matchPassword(password);
  if (!isPaswordMatch)
    return res.json({
      ok: false,
      message: "inicio de sesion fallo",
      type: "faildSignIn",
    });

  // *** obteniendo anuncios
  const adverts = await Advert.find({ owner: user._id });

  // *** Creando usuario para responder

  const setUser = {
    id: user._id,
    email: user.email,
    rol: user.rol,
    credit: user.credit,
    adverts,
  };

  // *** respondiendo token

  const payload = {
    id: user._id,
    email: user.email,
    rol: user.rol,
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET_TEXT, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({
    user: setUser,
    ok: true,
    message: "bienvendio",
    type: "successSignIn",
    token,
  });
};

usersCtrl.createUser = async (req, res) => {
  const { email, password } = req.body;

  //  *** validando email
  if (!validator.validate(email))
    return res.json({
      ok: false,
      message: "Este email es invalido",
      type: "invalidEmail",
    });

  // *** comprobando usuario
  const user = await User.findOne(
    { email },
    { credit: 1, email: 1, emailConfirmed: 1, rol: 1 }
  );
  console.log(user);
  if (user)
    return res.json({
      ok: false,
      message: "este mail ya esta registrado",
      type: "alreadyReg",
    });

  //verificando email para nuevo registro CON AYUDA DE :
  //https://user.whoisxmlapi.com/products asazer@hotmail.com

  let verifier = new Verifier("at_LM2BnUPluqaK1zlFmrkQRpPlIzko6");
  verifier.verify(email, async (err, data) => {
    if (err) {
      return res.json({
        ok: false,
        message: "Tuvimos un problema al verificar tu email. ",
        type: "verifyError",
      });
    }

    // *** creando Usuario
    const newUser = new User({
      email,
      password,
      emailConfirmed: false,
      rol: "user",
    });
    newUser.password = await newUser.encryptPassword(password);

    //  ***  credito de bienvenida
    newUser.credit = 50;

    // *** respondiendo usuario y token
    const payload = {
      id: newUser._id,
      email: newUser.email,
      rol: newUser.rol,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET_TEXT, {
      expiresIn: 60 * 60 * 24, // expires in 24 hours
    });
    // *** enviar correo  para esperar confirmacion
    const subjet = `Registro exitoso `;
    const content = `
    ¿Iniciaste un proceso para subscribirte a negociosdelbarrio.com ?
    \n 
    Sigue el siguiente enlace:
    \n ${host}/signup/${token} 
    \n 
    ¿No fuiste tu? Tu cuenta esta segura. Omite este correo.
    \n
    ¿Dudas? Contactanos https://negociosdelbarrio.com/contacto 
    `;
    sendEmail(email, subjet, content);
    //console.log(content);

    newUser.save();

    res.json({
      ok: true,
      message: "Revisa tu correo para concluir tu registro",
      type: "emailSent",
    });
  });
};

usersCtrl.confirmEmail = async (req, res) => {
  console.log("confirmando password", req.params);
  // *** confirma email
  const token = jwt.decode(req.params.token, { json: true });
  const user = await User.findOne({ email: token.email });
  if (user.emailConfirmed)
    return res.json({ message: "Este correo ya fue validado.", ok: false });
  const expirationToken = new Date(token.exp * 1000);
  if (expirationToken > new Date()) {
    const userUpdated = await User.findByIdAndUpdate(
      token.id,
      { emailConfirmed: true },
      { new: true }
    );
    const newUser = {
      name: user.name,
      rol: user.rol,
      email: user.email,
    };
    res.json({
      user: newUser,
      message: "Su correo electronico ha sido confirmado",
      ok: true,
      type: "alreadyConfirmed",
    });
  } else {
    res.json({
      message: "Parece que el enlace caduco. Por favor intenta de nuevo",
      ok: false,
      type: "invalidToken",
    });
    // *** return token invalido vuelve a intentarlo
  }
};

usersCtrl.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    console.log(user);
    if (user.emailConfirmed) {
      console.log("email confirmed");
      // *** Genera token para recuerar contraseña
      const payload = {
        recover: true,
        id: user.id,
      };
      const token = await jwt.sign(payload, process.env.JWT_SECRET_TEXT, {
        expiresIn: 60 * 15, // 15 minutos
      });
      //console.log('token', token)
      const subjet = `Recuperando contraseña`;
      const content = `
      Para recuperar tu contraseña da click en el sigiente enlace o pegalo en la barra de direcciones:
      \n 
      (Este enlace solo sera valido por 15 min)
      \n 
       ${host}/recover-password/${token} `;

      sendEmail(user.email, subjet, content);
      res.json({
        message: "Revisa tu correo para recuperar tu contraseña",
        ok: true,
        type: "emailSent",
      });
    }
  } else {
    console.log("not user");
    res.json({
      message: "Revisa tu correo para recuperar tu contraseña",
      ok: true,
      type: "emailSent",
    });
  }
};

usersCtrl.recoverPassword = async (req, res) => {
  const { email, password } = req.body;
  const token = jwt.decode(req.params.token, { json: true });
  // *** verificar si token esta en la lista negra
  const isInvalidToken = await InvalidToken.findOne({
    token: req.params.token,
  });
  const tokenExpired = new Date(token.exp * 1000) > new Date();
  // *** si el token esta en la base de datos o expiro, return ok: false
  if (!tokenExpired || !!isInvalidToken) {
    return res.json({
      message: "El token ya no es valido",
      ok: false,
      type: "invalidToken",
    });
  } else {
    const user = await User.findById(token.id);
    if (user.email !== email)
      return res.json({
        message: "Credenciales invalidas",
        type: "invalidForm",
      });
    const newPassword = await user.encryptPassword(password);
    // *** agregar token a lista negra
    const newInvalidToken = new InvalidToken({ token: req.params.token });
    newInvalidToken.save();
    // *** actualiza usuario con nueva contraseña
    await User.findByIdAndUpdate(
      { _id: token.id },
      { password: newPassword },
      { new: true }
    );
    // ** Prepara token para signIn
    const payload = {
      id: user._id,
      email: user.email,
      rol: user.rol,
    };
    const signInToken = await jwt.sign(payload, process.env.JWT_SECRET_TEXT, {
      expiresIn: 60 * 60 * 24,
    });
    res.json({
      user: payload,
      message: "Contraseña actualizada",
      ok: true,
      token: signInToken,
      type: "userUpdated",
    });
  }
};

usersCtrl.deleteUser = async (req, res) => {
  const userDeleted = await User.findByIdAndDelete(req.params.id);
  if (!userDeleted)
    return res.json({
      message: "este usuario no existe",
      type: "userUpdated",
      ok: false,
    });
  if (userDeleted)
    return res.json({
      message: "eliminando a " + userDeleted.email,
      type: "userUpdated",
      ok: true,
    });
};

usersCtrl.updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user.email);
};

// ***  Credito de usuario
usersCtrl.getCredit = async (req, res) => {
  // *** Solo muestra la forma de obtener credito, cuando se registra obtiene 50 de regalo
  res.json({ message: "credito disponible" });
};

usersCtrl.addCredit = async (req, res) => {
  // *** suma credito al usuario
  const { credit } = req.body;
  await User.update({ _id: req.token.id }, { $inc: { credit: credit } });
  const user = await User.findById(req.token.id, { credit: 1, email: 1 });
  res.json(user);
};

module.exports = usersCtrl;
