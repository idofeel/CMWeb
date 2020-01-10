import "babel-polyfill";
import 'url-search-params-polyfill'
import dva from "dva";
import "./index.css";

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/global").default);

// 4. Router
app.router(require("./CMWebRouter").default);

// 5. Start
app.start("#root");