import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./design-reset.css";
import "./session-route-ux.css";
import "./home-summary-ux.css";
import "./exercise-detail-ux.css";
import "./explore-filter-ux.css";
import "./exercise-card-readability-ux.css";
import "./contrast-readability-ux.css";
import "./repeat-explore-ux.css";
import "./atlas-reframe.css";

createRoot(document.getElementById("root")!).render(<App />);
