import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { Provider } from 'react-redux';
import store from '../storeredux/Store';  

test('renders description input field', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
});
test('renders description input field', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(screen.getByPlaceholderText("Amount Spent (₹)")).toBeInTheDocument();
});
test('renders description input field', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(screen.getByText("Amount")).toBeInTheDocument();
});