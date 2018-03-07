import React from 'react'; // eslint-disable-line
import AutocompleteInput from './autocomplete_input';
import { mount } from 'enzyme';
import data from '../MOCK_DATA_1000.json';

let component, input;

beforeEach(() => {
  component = mount(<AutocompleteInput data={data} />);
  input = component.find('input');
  // component.setProps( { data });
});

describe('the rendered component', () => {
  it('presents an input on render', () => {
    expect(input.length).toEqual(1);
  });

  it('displays a list of dropdown options when focused and hides them when blurred', () => {
    expect(component.find('li').length).toEqual(0);
    input.simulate('focus');
    expect(component.find('li').length).toEqual(1000);
    input.simulate('blur');
    expect(component.find('li').length).toEqual(0);
  });
});

describe('filtering the list', () => {
  it('filters the list based on the input value', () => {
    input.simulate('focus');
    input.simulate('change', {target: { value: 'gab'}});
    expect(component.find('li').length).not.toEqual(1000);
    component.find('li').forEach((item) => expect(item.text().toLowerCase().includes('gab')).toBeTruthy());
    component.find('li').forEach((item) => expect(item.text().toLowerCase().includes('badstring')).toBeFalsy());
  });
});

describe('making and clearing selections', () => {
  beforeEach(() => {
    input.simulate('focus');
    input.simulate('change', {target: { value: 'gab'}});
    expect(component.find('h2').exists()).toBeFalsy();
  });
  it('sets the selected item on list item click', () => {
    const selectionCandidate = component.find('li').at(2);
    selectionCandidate.simulate('mousedown');
    expect(component.find('h2').exists()).toBeTruthy();
    expect(component.find('h2').text()).toContain(selectionCandidate.text());
  });
  it('sets the selected item on enter key press', () => {
    const selectionCandidate = component.find('li').first();
    input.simulate('keypress', {key: 'Enter'});
    expect(component.find('h2').exists()).toBeTruthy();
    expect(component.find('h2').text()).toContain(selectionCandidate.text());
  });


  it('clears the selected item when the input value changes', () => {
    const selectionCandidate = component.find('li').first();
    input.simulate('keypress', {key: 'Enter'});
    expect(component.find('h2').exists()).toBeTruthy();
    input.simulate('change', {target: { value: 'howdy'}});
    expect(component.find('h2').exists()).toBeFalsy();
  });
});



