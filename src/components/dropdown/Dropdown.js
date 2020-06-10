import React, { Component } from "react";
import {ToggleExpandIcon} from "../../components/expand/ToggleExpandIcon.js";
import "./Dropdown.css";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => {
      return {expanded: !prevState.expanded }
    });
  }

  render() {

    const options = Object.keys(this.props.options).map(key => {
      const option = this.props.options[key];
      return (
        <div
          className="dropdown__option"
          id={key}
          key={key}
          onClick={this.props.onSelect}>
          {option.name}
        </div>
      )
    })

    return (
      <div className="dropdown" onClick={this.toggle}>
        <div className="dropdown__main">
          {this.props.selected}
        </div>
        <ToggleExpandIcon expanded={this.state.expanded} />
        {this.state.expanded
          ? <div className="dropdown__expanded">
              {options}
            </div>
          : null
        }
      </div>
    );
  }
}

Dropdown.defaultProps = {
  options: [],
  selected: "Algorithm",
  onSelect: () => {}
}

export default Dropdown;
