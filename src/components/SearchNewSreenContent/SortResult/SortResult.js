import React, { Component } from 'react';

import './style.css';

import SortOptionsItem from '../../SortOptionsItem';

class SortResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlightIconArrowVisible: false,
      sortResultOptions: [
        {
          id: 1,
          optionName: 'Popular',
          highlightIconArrowVisible: false
        },
        {
          id: 2,
          optionName: 'Online + popular',
          highlightIconArrowVisible: false
        },
        {
          id: 3,
          optionName: 'A - Z',
          highlightIconArrowVisible: true
        }
      ],
      selectedOption: null
    };
  }

  handleSortResultOptionClick = id => {
    this.setState({ selectedOption: id, highlightIconArrowVisible: true });
  };

  render() {
    const { sortResultOptions, selectedOption } = this.state;
    const {
      sortResultContainerWhenCollapse,
      displaySortResultClick
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
            highlightIconArrowVisible={this.state.highlightIconArrowVisible}
            onClick={this.handleSortResultOptionClick}
            onDisplaySortResultClick={displaySortResultClick}
            isSelected={selectedOption}
          />
        ))}
      </div>
    );
  }
}

export default SortResult;
