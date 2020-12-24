import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import CallIcon from "@material-ui/icons/Call";
import FacebookIcon from "@material-ui/icons/Facebook";
import LanguageIcon from "@material-ui/icons/Language";
import InstagramIcon from "@material-ui/icons/Instagram";

export const CONTACT_TYPES = [
  {
    name: "Whatsapp",
    value: "ws",
    label: "Whats App",
    icon: <WhatsAppIcon fontSize="default" />,
  },
  {
    name: "facebook",
    value: "fb",
    label: "Facebook",
    icon: <FacebookIcon fontSize="default" />,
  },
  {
    name: "instagram",
    value: "in",
    label: "Instagram",
    icon: <InstagramIcon fontSize="default" />,
  },
  {
    name: "webpage",
    value: "web",
    label: "Pagina Web",
    icon: <LanguageIcon fontSize="default" />,
  },
  {
    name: "tel",
    value: "tel",
    label: "Fijo",
    icon: <CallIcon fontSize="default" />,
  },
];
