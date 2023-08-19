import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import './index.css'
import MatchCard from '../MatchCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class TeamMatches extends Component {
  state = {
    teamMatchData: {},
    isWorking: false,
  }

  componentDidMount = () => {
    this.getTeamData()
  }

  getTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)

    const data = await response.json()
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        id: data.latest_match_details.id,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        date: data.latest_match_details.date,
        firstInnings: data.latest_match_details.first_innings,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        matchStatus: data.latest_match_details.match_status,
        result: data.latest_match_details.result,
        secondInnings: data.latest_match_details.second_innings,
        umpires: data.latest_match_details.umpires,
        venue: data.latest_match_details.venue,
      },
      recentMatches: data.recent_matches.map(recentMatch => ({
        umpires: recentMatch.umpires,
        result: recentMatch.result,
        manOfTheMatch: recentMatch.man_of_the_match,
        id: recentMatch.id,
        date: recentMatch.date,
        venue: recentMatch.venue,
        competingTeam: recentMatch.competing_team,
        competingTeamLogo: recentMatch.competing_team_logo,
        firstInnings: recentMatch.first_innings,
        secondInnings: recentMatch.second_innings,
        matchStatus: recentMatch.match_status,
      })),
    }
    console.log(updatedData)
    this.setState({
      teamMatchData: updatedData,
      isWorking: true,
    })
  }

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const {teamMatchData, isWorking} = this.state
    if (isWorking === true) {
      const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchData
      const className = `team-matches-route-container ${this.getRouteClassName()}`

      return (
        <div className={`app-team-matches-container ${id}`}>
          <div className="team-matches-container">
            <img
              src={teamBannerUrl}
              alt="team-banner"
              className="team-banner"
            />
            <LatestMatch latestMatch={latestMatchDetails} />
            <ul className="recent-matches-list">
              {recentMatches.map(eachItem => (
                <MatchCard matchData={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        </div>
      )
    }
    return (
      <div className="loader">
        <Loader type="TailSpin" color="#00BFFF" height={200} width={500} />
      </div>
    )
  }
}

export default TeamMatches
