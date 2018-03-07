import React, { Component } from 'react';

export default class AutocompleteInput extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      item: null,
      items: this.props.data || [],
      filteredItems: this.props.data || [],
      filterValue: '',
      optionListIsVisible: false,
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }
  handleKeyPress(e) {
    const { key } = e;

    if (key === 'Enter' && this.state.filteredItems.length) {
      this.selectItem(this.state.filteredItems[0]);
    }
  }
  selectItem(item) {
    this.updateFilterValue(item.label);
    this.setState({
      item,
    });
    this.input.blur();
  }
  updateFilterValue(filterValue) {
    this.setState({
      item: null,
      filterValue,
      filteredItems: this.state.items.filter((item) => item.label.toLowerCase().includes(filterValue.toLowerCase())),
    });
  }
  renderAutocompleteOptions() {
    if (!this.state.optionListIsVisible) return;
    return (
      <ul className='autocomplete-options-list'>
        {this.state.filteredItems
          .map((item, i) => {
            return <li onTouchStart={() => this.selectItem(item)} onMouseDown={() => this.selectItem(item)} key={i}>{item.label}</li>;
          }, this)
        }
      </ul>
    );
  }
  renderSelectedValue() {
    if (!this.state.item) return;
    return (
      <h2>You have selected {this.state.item.label}, with a value of {this.state.item.value}</h2>
    );
  }
  render() {
    return (
      <div className='autocomplete-wrapper'>
        <input
          type="text" value={this.state.filterValue}
          onKeyPress={this.handleKeyPress}
          onChange={(e) => this.updateFilterValue(e.target.value)} 
          onFocus={() => this.setState({ optionListIsVisible: true})}
          onBlur={() => this.setState({optionListIsVisible: false})}
          ref={(input) => { this.input = input; }} />
        {this.renderAutocompleteOptions()}
        {this.renderSelectedValue()}
      </div>
    );
  }
}