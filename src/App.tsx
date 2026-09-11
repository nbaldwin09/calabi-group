import { Routes, Route } from "react-router-dom";
import { Route as R0 } from "./routes/backups";
import { Route as R1 } from "./routes/compute";
import { Route as R2 } from "./routes/console";
import { Route as R3 } from "./routes/docs";
import { Route as R4 } from "./routes/fabric";
import { Route as R5 } from "./routes/index";
import { Route as R6 } from "./routes/pricing";
import { Route as R7 } from "./routes/route";
import { Route as R8 } from "./routes/status";
import { Route as R9 } from "./routes/storage";
import { Route as R10 } from "./routes/terms";

export default function App() {
  const Layout = R7.component;
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="backups" element={<R0.component />} />
        <Route path="compute" element={<R1.component />} />
        <Route path="console" element={<R2.component />} />
        <Route path="docs" element={<R3.component />} />
        <Route path="fabric" element={<R4.component />} />
        <Route index element={<R5.component />} />
        <Route path="pricing" element={<R6.component />} />
        <Route path="status" element={<R8.component />} />
        <Route path="storage" element={<R9.component />} />
        <Route path="terms" element={<R10.component />} />
      </Route>
    </Routes>
  );
}
