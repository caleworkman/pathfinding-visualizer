import React, { PureComponent } from "react";
import "./Button.css";

class Button extends PureComponent {
  render() {
    return (
      <div className="button" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}

export default Button;
