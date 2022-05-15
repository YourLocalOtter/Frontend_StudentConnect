import {Link} from "react-router-dom";

export default function Home(props){
    // Check if user is logged in, if they are direct them to the "AuthenticatedHomepage"
    
    return <div className="homepage">
        <h2 className="content-title">404: Page not found</h2>
        <p>We searched and were unable to find a page matching your request. Perhaps you'd like to go back <Link to="/">to the homepage</Link>.</p>
    </div>;
}