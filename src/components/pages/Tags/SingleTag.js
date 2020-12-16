/* eslint-disable no-undef */
import React from 'react';

import './SingleTag.scss';

import tagData from '../../../data/tagData';

class SingleTag extends React.Component {
  state = {
    isOPen: false,
  }

  deleteTag = (e) => {
    e.preventDefault();
    const { tag } = this.props;
    console.error(tag.id);
    tagData.deleteTag(tag.id)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch((err) => console.error(err));
  }

  update = () => {
    const { tag } = this.props;
    this.props.updateThisTag(tag.label, tag.id);
  }

  link = (e) => {
    e.preventDefault();
    const { tag } = this.props;
    this.props.history.push(`/articles/${tag.id}`);
  }

  tagUpdate = (e) => {
    e.preventDefault();
    this.setState({ label: e.target.value });
  }

  render() {
    const { tag } = this.props;
    return (
      <div className='card single-tag row justify-content-center'>
        <h2 className='card-title'>{tag.label}</h2>
        <button className='btn btn-danger' onClick={this.update}> Update </button>
        <button className='btn btn-warning' onClick={this.deleteTag}>Delete Tag</button>
      </div>
    );
  }
}

export default SingleTag;
