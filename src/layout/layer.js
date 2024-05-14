import { Link } from "react-router-dom";
import Contact from "../contact/contact";
import About from "../about/about";
export default function Layer()
{
    return(
        <div>
        <Contact />
        <About />
        </div>
    );
}