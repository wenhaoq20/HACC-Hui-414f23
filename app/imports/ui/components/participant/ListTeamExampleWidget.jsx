import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Header, List } from 'semantic-ui-react';
// import _ from 'lodash';
import _ from 'underscore';
import swal from 'sweetalert';
import { WantsToJoin } from '../../../api/team/WantToJoinCollection';
import { Participants } from '../../../api/user/ParticipantCollection';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import { Teams } from '../../../api/team/TeamCollection';
import { Slugs } from '../../../api/slug/SlugCollection';

class ListTeamExampleWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sent: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, inst) {
    console.log(e, inst);
    const collectionName = WantsToJoin.getCollectionName();
    const teamDoc = Teams.findDoc(inst.id);
    const team = Slugs.getNameFromID(teamDoc.slugID);
    const participant = Participants.findDoc({ userID: Meteor.userId() }).username;
    const definitionData = {
      team,
      participant,
    };
    console.log(collectionName, definitionData);

    defineMethod.call({ collectionName, definitionData }, (error) => {
      if (error) {
        swal('sent request fail', error, 'error');
      } else {

        swal('sent ', 'join request sent', 'success');
        this.setState({ sent: true });
}
    });
  }

  renderButton() {
    const participant = Participants.findDoc({ userID: Meteor.userId() });
    const participantName = Participants.getFullName(participant._id);
    const isAMember = _.includes(this.props.teamMembers, participantName);

    const Joinrequests = WantsToJoin.find({ teamID: this.props.team._id }).fetch();
    const Joinsentusers = _.pluck(Joinrequests, 'participantID');
    const Requested = _.contains(Joinsentusers, participant._id);

    if (isAMember) {
      return (<Button id={this.props.team._id} color="green"
                      disabled={true} style={{ width: `${90}px`,
        height: `${80}px`, textAlign: 'center' }} >You own the team</Button>);
    }
    if (this.state.sent || Requested) {
      return (<Button id={this.props.team._id} color="green"
                      disabled={true} style={{ width: `${90}px`,
        height: `${80}px`, textAlign: 'center' }} >You sent the request</Button>);
    }
    return (<Button id={this.props.team._id} color="green"
                    onClick={this.handleClick} style={{ width: `${90}px`,
      height: `${60}px`, textAlign: 'center' }} >Request to Join</Button>);
  }

  render() {

    return (
        <Grid.Row columns={6}>
          <Grid.Column>
            <Header as="h3">{this.props.team.name}</Header>
          </Grid.Column>
          <Grid.Column>
            <List bulleted>
              {this.props.teamChallenges.map((c) => <List.Item key={c}>{c}</List.Item>)}
            </List>
          </Grid.Column>
          <Grid.Column>
            <List bulleted>
              {this.props.teamSkills.map((s) => <List.Item key={s}>{s}</List.Item>)}
            </List>
          </Grid.Column>
          <Grid.Column>
            <List bulleted>
              {this.props.teamTools.map((t) => <List.Item key={t}>{t}</List.Item>)}
            </List>
          </Grid.Column>
          <Grid.Column>
            <List bulleted>
              {this.props.teamMembers.map((t) => <List.Item key={t}>{t}</List.Item>)}
            </List>
          </Grid.Column>
          <Grid.Column>
            {this.renderButton()}
          </Grid.Column>
        </Grid.Row>
    );
  }
}
ListTeamExampleWidget.propTypes = {
  team: PropTypes.object.isRequired,
  teamChallenges: PropTypes.arrayOf(
      PropTypes.string,
  ).isRequired,
  teamSkills: PropTypes.arrayOf(
      PropTypes.string,
  ).isRequired,
  teamTools: PropTypes.arrayOf(
      PropTypes.string,
  ).isRequired,
  teamMembers: PropTypes.arrayOf(
      PropTypes.string,
  ).isRequired,
};
export default ListTeamExampleWidget;
