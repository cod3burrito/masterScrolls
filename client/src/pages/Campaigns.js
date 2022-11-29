import { useContext } from 'react';
import UserContext from '../utils/UserContext';
import { Link } from 'react-router-dom';

function Campaigns() {
    const { user } = useContext(UserContext);

    return(
        <>
            <h2>Hello, {user.username}. Which campaign would you like to view?</h2>
            {user.campaigns.map(campaign => {
                return (
                    <div key={campaign._id}>
                        <h3>{campaign.name}</h3>
                        <section>{campaign.plot}</section>
                        <Link to={`/campaign/${campaign._id}`}>View Campaign</Link>
                    </div>
                )
            })}
        </>
    )
}

export default Campaigns