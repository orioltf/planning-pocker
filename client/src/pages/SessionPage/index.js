/**
 * Component. Public page
 * @file
 */

import React, { Component } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { Button, Form, Input, Grid, Segment } from 'semantic-ui-react'

import PlaygroundPlayer from '../../components/PlaygroundPlayer';

class MainPage extends Component {
  handleChange = path => e => {
    this.props.updateField({ path, value: e.target.value });
  };

  handleJoinSession = e => {
    e.preventDefault();
    const { joinSession, login } = this.props;
    joinSession({ login });
  };

  render() {
    const { page, login, sessionId, auth, isConnected, error } = this.props;
    return (
      page === 'session' &&
      <Grid centered>
        <Grid.Column>
          <Segment>
            {
              sessionId &&
              <div>Сесія: {sessionId}</div>
            }
            <span>&nbsp;</span>
            {
              !auth &&
              <Form>
                <Form.Field>
                  <Input
                    label="Ім'я гравця:"
                    icon={{name: 'asterisk', color: 'red'}}
                    type="text"
                    value={login}
                    onChange={this.handleChange('data.login')}
                  />
                </Form.Field>
                <span>&nbsp;</span>
              </Form>
            }
            {
              !auth &&
              <Button color="green" disabled={!isConnected || !login} onClick={this.handleJoinSession}>Приєднатися до сесії</Button>
            }
            {
              error &&
              <div className="error" style={{ color: 'red' }}>{error}</div>
            }
            {
              auth &&
              <PlaygroundPlayer />
            }
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  {
    page: state`data.page`,
    login: state`data.login`,
    auth: state`data.auth`,
    isConnected: state`data.isConnected`,
    error: state`data.error`,
    sessionId: state`data.sessionId`,
    // player2Index: state`data.player2Index`,
    joinSession: signal`joinSession`,
    updateField: signal`updateField`,
    // updateName: sequences`updateName`,
    // newGame: sequences`newGame`,
  },
  MainPage,
);
