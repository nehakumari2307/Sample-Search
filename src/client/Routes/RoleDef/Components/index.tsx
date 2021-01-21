import * as React from 'react';

import { ThemeContext } from '../../../Context';
import RoleListComponent from './RoleList';
import { connect } from 'react-redux';
import AppStore from 'Redux/Store';
import { RoleListInit } from '../Redux/RoleListReducer';
import { ROLE_SEARCH } from 'Redux/Reducer';
import { RoleListReduxProp } from '../Types/RoleListProp';
/**
 * Root component which calls the list component to show the existing role list
 * Then list component calls different other components like create, members, etc
 * @extends React.Component
 */
class RoleDefComponent extends React.Component<RoleListReduxProp> {
  componentDidMount() {
    AppStore.dispatch(RoleListInit);
  }
  /**
   * Render the component to the DOM
   * @returns {}
   */
  render() {
    return (
      <div>
        <ThemeContext.Consumer>
          {theme => <RoleListComponent theme={theme} roleDefs={this.props} />}
        </ThemeContext.Consumer>
      </div>
    );
  }
}

export default connect((state: any) => {
  return state[ROLE_SEARCH];
})(RoleDefComponent);
