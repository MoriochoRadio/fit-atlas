import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./design-reset.css";
import "./screen-overrides.css";
import "./atlas-reframe.css";

createRoot(document.getElementById("root")!).render(<App />);
