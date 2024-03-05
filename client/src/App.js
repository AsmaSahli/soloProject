import { Route, Routes ,Navigate} from "react-router-dom";

import { BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Bookes from "./Pages/Bookes";
import About from "./Pages/About";




function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={< SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/about" element={<About/>} />
        <Route element={<PrivateRoute/>} >
          <Route path="/bookes" element={<Bookes/>} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
