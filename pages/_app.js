import "../styles/globals.css";

import { UserProvider } from "../context/UserContext";

const App = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />;
    </UserProvider>
  );
};

export default App;
