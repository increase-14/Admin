import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import BookPage from "./pages/BookPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import LibrariesPage from "./pages/LibrariesPage";
import BookDetail from "./pages/BookDetail";
import LibrariesDetail from "./pages/LibrariesDetail";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/book" element={<BookPage />} />
          <Route index element={<LibrariesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/regis" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="book/:id" element={<BookDetail />} />
          <Route path="libraries/:id" element={<LibrariesDetail />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
