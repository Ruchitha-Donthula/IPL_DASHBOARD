import {Component} from 'react'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teamCardsList: [],
  }

  componentDidMount = () => {
    this.getMyCards()
  }

  getMyCards = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.team_image_url,
    }))
    console.log(updatedData)

    this.setState({
      teamCardsList: updatedData,
    })
  }

  render() {
    const {teamCardsList} = this.state
    return (
      <div className="app-container">
        <div className="ipl-container">
          <div className="header-container">
            <img
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="logo"
            />
            <h1 className="header-heading">IPL dashboard</h1>
          </div>
          <ul className="team-list-items">
            {teamCardsList.map(eachCard => (
              <TeamCard cardDetails={eachCard} key={eachCard.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
