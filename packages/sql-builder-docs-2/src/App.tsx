import { Route } from "@solidjs/router";
import { About } from "./About";
import { Contact } from "./Contact";
import { Home } from "./Home";

function App() {
    return (
        <>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
        </>
    );
}

export default App;