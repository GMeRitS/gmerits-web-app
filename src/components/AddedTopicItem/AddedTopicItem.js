import React from 'react';
import {Button, InputGroup, InputGroupAddon} from "reactstrap";

import './style.css';

import trashIcon from '../../assets/iconTrash.png';

const AddedTopicItem = ({
  topicName,
  id,
  onRemoveClick
}) => {
  function handleRemoveOnClick() {
    onRemoveClick(id);
  }

  return (
    <InputGroup className="added-topic-item-container">
      <InputGroupAddon className="remove-button" addonType="prepend">
        <Button className="remove-topic-item-button" onClick={handleRemoveOnClick}>
          <img src={trashIcon} alt="" />
        </Button>
      </InputGroupAddon>
      <div className="topic-item-name">
        <p>{topicName}</p>
      </div>
    </InputGroup>
  )
};

export default AddedTopicItem;