import { Route, Routes ,Navigate} from "react-router-dom";

import { BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Bookes from "./Pages/Bookes";
import About from "./Pages/About";
import UpdateBook from "./Pages/UpdateBook";
import ShowBook from "./Pages/ShowBook";
import AuthentificationRoute from "./components/AuthentificationRoute";
import FavouriteBooks from "./Pages/FavouriteBooks";




function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
      <Route element={<AuthentificationRoute/>} >
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={< SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Route>
        <Route path="/about" element={<About/>} />
        <Route element={<PrivateRoute/>} >
          <Route path="/books" element={<Bookes/>} />
          <Route path="/updateBook/:bookId" element={<UpdateBook/>} />
          <Route path="/showBook/:bookId" element={<ShowBook/>} />
          <Route path="/favouriteBooks" element={<FavouriteBooks/>} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
