import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {cardDetails} = props
  const {id, name, imageUrl} = cardDetails

  return (
    <Link to={`team-matches/${id}`} className="link-item">
      <div className="team-card">
        <img className="team-logo" src={imageUrl} alt={`card${id}`} />
        <p className="team-name">{name}</p>
      </div>
    </Link>
  )
}

export default TeamCard
