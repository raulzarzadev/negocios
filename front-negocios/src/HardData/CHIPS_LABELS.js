import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import HealingIcon from "@material-ui/icons/Healing";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import WifiIcon from '@material-ui/icons/Wifi';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

export const CHIP_LABELS = [
  { key: 1, value: "food", label: "Comida", icon: <RestaurantIcon /> },
  { key: 2, value: "drink", label: "Bebidas", icon: <LocalBarIcon /> },
  { key: 3, value: "mom", label: "Mama", icon: <ChildFriendlyIcon /> },
  {
    key: 4,
    value: "maintenance",
    label: "Mantenimiento",
    icon: <HomeWorkIcon />,
  },
  { key: 5, value: "healtcare", label: "Salud", icon: <HealingIcon /> },
  { key: 6, value: "delibery", label: "A domicilio", icon: <MotorcycleIcon /> },
  { key: 7, value: "wifi", label: "Wi-Fi", icon: <WifiIcon /> },
  { key: 8, value: "whatsapp", label: "Whats App", icon: <WhatsAppIcon /> },
];
