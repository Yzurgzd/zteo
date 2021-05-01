import "../public/assets/vendor/bootstrap/dist/css/bootstrap-grid.min.css";
import "../public/assets/vendor/bootstrap/dist/css/bootstrap-reboot.min.css";
import "../public/assets/vendor/bootstrap/dist/css/bootstrap-utilities.min.css";

import "../public/assets/css/theme.css";
import "../public/assets/css/custom.css";
import "../public/assets/css/rc-slider.css";

import "../public/assets/vendor/font-awesome/css/all.min.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { AlertSoftPrimaryTemplate } from "../components/alertTemplate";
import NextNprogress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "10px",
    // you can also just use 'scale'
    // transition: transitions.SCALE,
  };

  return (
    <AlertProvider template={AlertSoftPrimaryTemplate} {...options}>
      <NextNprogress
        color="#377dff"
        startPosition={0.3}
        stopDelayMs={200}
        height="3"
      />
      <Component {...pageProps} />
    </AlertProvider>
  );
}

export default MyApp;
