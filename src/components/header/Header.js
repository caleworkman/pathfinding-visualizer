import React, { PureComponent } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./Header.css";

import {ReactComponent as PlayIcon} from "../../assets/play-icon.svg";
import {ReactComponent as GridIcon} from "../../assets/grid-icon.svg";
import {ReactComponent as ReplayIcon} from "../../assets/replay-icon.svg";
import {ReactComponent as ShuffleIcon} from "../../assets/shuffle-icon.svg";

class Header extends PureComponent {

  render() {
    const algorithmOptions = Object.keys(this.props.dropdownOptions).map(key => {
      const algorithm = this.props.dropdownOptions[key];
      return (
        <Dropdown.Item
          key={key}
          onClick={() => this.props.onSelectAlgorithm(key)}>
          {algorithm.name}
        </Dropdown.Item>
      );
    });

    return (
      <div className="header">

        <div className="header__logo">
          Pathfinding Visualizer
        </div>

        <div className="header__controls">
          <DropdownButton id="dropdown-basic-button" title={this.props.selectedAlgo}>
            {algorithmOptions}
          </DropdownButton>
          <Button onClick={this.props.findPath}><PlayIcon /></Button>

          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="bottom">
                Reset Board
              </Tooltip>
            }
          >
            <Button onClick={this.props.reset}><GridIcon /></Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="bottom">
                Randomize Start and Finish
              </Tooltip>
            }
          >
          <Button onClick={this.props.randomizeGrid}><ShuffleIcon /></Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="bottom">
                Clear Path
              </Tooltip>
            }
          >
          <Button onClick={this.props.clearPath}><ReplayIcon /></Button>
          </OverlayTrigger>
        </div>

      </div>
    );
  }
}

Header.defaultProps = {
  selectedAlgo: "Algorithm",
}

export default Header;
