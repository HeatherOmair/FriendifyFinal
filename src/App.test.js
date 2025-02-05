// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App'; // Update the path if needed

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    const linkElement = screen.getByText(/Friendify/i); // Or any text you expect in your App component
    expect(linkElement).toBeInTheDocument();
  });
});
