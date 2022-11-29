import { useContext } from 'react';
import UserContext from '../utils/UserContext';

function Campaigns(props) {
    const { user } = useContext(UserContext);
    console.log(user);

    return(
        <>
            <p>Campaign</p>
        </>
    )
}

export default Campaigns