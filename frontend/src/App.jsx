import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
/*Routes → container for all routes
Route → defines a page URL
Navigate → redirects users
useNavigate → code se manually page change karna */

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);//app jab start hoga toh localStorage se token check karna hai. Uss check ke complete hone tak ui wait karega. 
//app startup ke time run hoga
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
    setLoading(false);
  }, []);

  if (loading) return null; // prevents flash of dashboard mtlb jab tak auth check ho raha hai, galti se we don't open the dashboard

  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      {/* yaha prop send kar rahe hai taaki jab login component token uodate kare toh set kar sake token */}

      <Route
        path="/"
        element={token ? 
          (<Dashboard setToken={setToken} />) : (<Navigate to="/login" replace />)
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />   
      {/* * = unknown routes, koi bhi unknown route hoga toh we will redirect to / */}
    </Routes>
  );
}

export default App;