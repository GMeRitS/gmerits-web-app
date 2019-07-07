import React, { Component } from 'react';

import './style.css';

import SortOptionsItem from '../../SortOptionsItem';

class SortResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlightIconArrowVisible: false
    };
  }

  handleSortResultOptionClick = () => {
    this.setState({
      highlightIconArrowVisible: true
    });
  };

  render() {
    const {
      sortResultContainerWhenCollapse,
      sortResultOptions,
      onSortResultOptionClick,
      selectedOption
    } = this.props;

    return (
      <div
        className={
          sortResultContainerWhenCollapse
            ? 'sort-result-container-collapse'
            : 'sort-result-container'
        }
      >
        {sortResultOptions.map((option, id) => (
          <SortOptionsItem
            key={id}
            sortOption={option.optionName}
            id={option.id}
            highlightIconArrowVisible={this.handleSortResultOptionClick}
            onClick={onSortResultOptionClick}
            isSelected={selectedOption.id === option.id}
          />
        ))}
      </div>
    );
  }
}

export default SortResult;
