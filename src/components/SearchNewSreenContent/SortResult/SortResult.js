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
      selectedOption: {}
    };
  }

  handleSortResultOptionClick = id => {
    const { sortResultOptions } = this.state;

    this.setState({
      selectedOption: sortResultOptions.find(option => option.id === id),
      highlightIconArrowVisible: true
    });
    console.log(sortResultOptions.find(option => option.id === id));
  };

  render() {
    const { sortResultOptions, selectedOption } = this.state;
    const {
      sortResultContainerWhenCollapse,
      displaySortResultClick
    } = this.props;

    console.log(selectedOption);
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
            isSelected={selectedOption.id === option.id}
          />
        ))}
      </div>
    );
  }
}

export default SortResult;
