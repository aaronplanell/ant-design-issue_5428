import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';

jest.mock('rc-tabs/lib/ScrollableInkTabBar.js', () => {
  return (props) => <div>{props.children}</div>;
});

jest.mock('react-dom', () => ({
  findDOMNode() { return null; },
  render() { return null; }
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('snapshot matchs', () => {
  const tree = renderer.create(
    <App />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
