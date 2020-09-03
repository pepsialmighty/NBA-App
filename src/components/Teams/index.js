import React, { Component } from 'react';
import axios from 'axios';
import { URL_TEAMS } from '../utils/paths';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MyModal from './modal';

class Teams extends Component {
  state = {
    teams: [], ///whole list
    filtered: [], ///altered teams array
    team: null,
    keyword: '',
  };

  getTeam() {
    axios.get(`${URL_TEAMS}`).then((response) => {
      this.setState({
        teams: response.data,
        filtered: response.data,
      });
    });
  }

  clearModalTeam = () => {
    this.setState({
      team: null,
    });
  };

  showModalTeam = (data) => {
    this.setState({
      team: data,
    });
  };

  renderList = (filtered) =>
    filtered.map((item, i) => (
      <CSSTransition key={i} classNames='fade' timeout={500}>
        <div className='team_item' onClick={() => this.showModalTeam(item)}>
          <img alt={item.name} src={`/images/teams/${item.logo}`} />
        </div>
      </CSSTransition>
    ));

  searchTerm = (event) => {
    const keyword = event.target.value;
    if (keyword !== '') {
      const list = this.state.teams.filter((item) => {
        return item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
      this.setState({
        filtered: list,
        keyword,
      });
    } else {
      this.setState({
        filtered: this.state.teams,
        keyword,
      });
    }
  };

  render() {
    return (
      <div className='teams_component'>
        <div className='teams_input'>
          <input
            type='text'
            placeholder='Search for a team'
            value={this.state.keyword}
            onChange={(e) => this.searchTerm(e)}
          />
        </div>
        <div className='container teams_container'>
          <TransitionGroup component='span'>
            {this.renderList(this.state.filtered)}
          </TransitionGroup>
        </div>
        <MyModal
          team={this.state.team}
          clearModal={() => this.clearModalTeam()}
        />
      </div>
    );
  }

  componentDidMount() {
    this.getTeam();
  }
}
export default Teams;
