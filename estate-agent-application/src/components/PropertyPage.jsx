import { useParams} from "react-router-dom";

export default function PropertyPage(){
    const {id} = useParams();
    return(
        <div>
            <h1>Property Details</h1>
            <p>Details of property ID: {id}</p>
        </div>
    );
}
