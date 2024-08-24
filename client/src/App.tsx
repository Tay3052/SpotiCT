import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeaderLayor } from "./pages/Header";
import { Home } from "./pages/Home";
import { Callback } from "./api/callback/Callback";
import { SearchPage } from "./pages/Search";
import { SignupPage } from "./pages/SignupPage";
import { SigninPage } from "./pages/SigninPage";
import { DetailPage } from "./pages/DetailPage";
import { Favorite } from "./pages/Favorite";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderLayor />}>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
