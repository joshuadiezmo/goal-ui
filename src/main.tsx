import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Sample1 from "./pages/sample1.tsx";
import Sample2 from "./pages/sample2.tsx";
import Sample3 from "./pages/sample3.tsx";
import Sample4 from "./pages/sample4.tsx";
import Sample5 from "./pages/sample5.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sample1" element={<Sample1 />} />
        <Route path="/sample2" element={<Sample2 />} />
        <Route path="/sample3" element={<Sample3 />} />
        <Route path="/sample4" element={<Sample4 />} />
        <Route path="/sample5" element={<Sample5 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
