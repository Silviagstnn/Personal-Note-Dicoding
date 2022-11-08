import { ThemeConsumer } from "../contexts/ThemContext";
import {FaMoon, FaSun} from "react-icons/fa";

function ToggleTheme (){
    return(
        <ThemeConsumer>
            {({theme, toggleTheme}) =>{
                return <button onClick={toggleTheme}>{theme === 'dark' ? <FaSun />:<FaMoon /> }</button>;
            }}
        </ThemeConsumer>
    );
}

export default ToggleTheme;