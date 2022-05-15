import config from "./config";

export default function(props){
    return <nav class="navbar">
        {/*TODO: Use react router link */}
        <a href="/" class="navbar-brand">
            {config.brand}
        </a>
    </nav>
}