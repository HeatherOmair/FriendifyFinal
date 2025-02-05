// SignInPage.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import SignInPage from './SignInPage';  // Make sure the path is correct

describe('SignInPage', () => {
  test('renders the SignInPage form', () => {
    render(<SignInPage />);
    
    // Check if the form is rendered correctly
    const usernameInput = screen.getByLabelText(/username/i); // Assumes you have a label with text 'Username'
    const passwordInput = screen.getByLabelText(/password/i); // Assumes you have a label with text 'Password'
    const submitButton = screen.getByRole('button', { name: /sign in/i });  // Check for a 'Sign In' button

    // Verify inputs and button are in the document
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('can type into inputs', () => {
    render(<SignInPage />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });

  test('submits the form correctly', () => {
    render(<SignInPage />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Add expectations for what happens when the form is submitted
    // This might include a call to an API, form submission, etc.
    // Example: expect(somethingToBeTrue).toBe(true);
  });
});
