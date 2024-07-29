import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeaderLayor } from "./pages/Header";
import { Home } from "./pages/Home";
import { Callback } from "./api/callback/Callback";
import { SearchPage } from "./pages/Search";
import { SignupPage } from "./pages/SignupPage";
import { SigninPage } from "./pages/SigninPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderLayor />}>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/detail/:trackid" />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
