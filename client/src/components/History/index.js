import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { Button } from 'semantic-ui-react';
import { Rail, Segment } from 'semantic-ui-react';

import './History.css';

class History extends Component {
  switchStory = num => () => {
    this.props.switchStory({ num });
  };

  render() {
    const { stories = [], currentStory } = this.props;
    const currentStoryNum = currentStory ? currentStory.num : null;
    return (
      <Rail position='right' className="history__list">
        <Segment>
          <div><b>Історії</b></div>
          <div className="history__interior">
            {
              stories.map(story => (
                <Button
                  className="history__button"
                  key={story.num}
                  color={story.num === currentStoryNum ? 'orange' : 'green'}
                  onClick={this.switchStory(story.num)}
                >
                  # {story.num} - {story.result}
                </Button>
              ))
            }
          </div>
        </Segment>
      </Rail>
    )
  }
}

export default connect(
  {
    stories: state`data.playground.stories`,
    currentStory: state`data.playground.currentStory`,
    switchStory: signal`switchStory`,
  },
  History,
);
