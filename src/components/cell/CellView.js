import React, { PureComponent } from "react";

import {ReactComponent as StartIcon} from "../../assets/person-icon.svg";
import {ReactComponent as FinishIcon} from "../../assets/home-icon.svg";

import "./Cell.css";

class CellView extends PureComponent {
  render() {

    const className = this.props.type
      ? "cell cell--" + this.props.type
      : "cell";

    return (
      <div
        className={className}
        data-row={this.props.row}
        data-column={this.props.column}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        id={"row"+this.props.row+"col"+this.props.column}
      >

      {(this.props.type === "start") ? <StartIcon /> : null}
      {(this.props.type === "finish") ? <FinishIcon /> : null}

      </div>
    );
  }
}

export default CellView;
