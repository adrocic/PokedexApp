import React from 'react';
import { Input, Icon } from 'antd';

const icon = type => <Icon type={type} style={{ fontSize: 16 }} />

export class ToggleablePassword extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isVisible: false
    }
  }

  toggleVisible = () => {
    const isVisible = ! this.state.isVisible;
    this.setState({ isVisible });
  }

  render () {
    const { isVisible } = this.state;

    const props = {
      ...this.props
    };

    return (
      <Input
        {...this.props}
        prefix={icon('lock')}
        suffix={
          <a onClick={this.toggleVisible}>
            {icon(isVisible ? 'eye' : 'eye-o')}
          </a>
        }
        type={isVisible ? "text" : "password"}
      />
    );
  }
};

export const Email = props => (
  <Input prefix={icon('mail')} type='email' {...props} />
);
