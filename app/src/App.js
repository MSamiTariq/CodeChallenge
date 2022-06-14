import Home from  './components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
}

export default App;