import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import AddItemForm from './AddItem';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('AddItemForm', () => {
  beforeEach(() => {
    useNavigate.mockReset();
  });

  test('form starts with all empty values', () => {
    const { getByLabelText } = render(<AddItemForm addItem={() => {}} />);
    
    // Assert that all input fields are empty
    expect(getByLabelText('Type:').value).toEqual('');
    expect(getByLabelText('Name:').value).toEqual('');
    expect(getByLabelText('Description:').value).toEqual('');
    expect(getByLabelText('Recipe:').value).toEqual('');
    expect(getByLabelText('Serve:').value).toEqual('');
  });

  test('addItem is called with formData.type and formattedItem when all values are filled out and submit button is clicked', () => {
    const addItemMock = jest.fn();
    useNavigate.mockReturnValue(jest.fn());
    const { getByLabelText, getByText } = render(<AddItemForm addItem={addItemMock} />);
    
    // Fill out all input fields
    fireEvent.change(getByLabelText('Type:'), { target: { value: 'snack' } });
    fireEvent.change(getByLabelText('Name:'), { target: { value: 'Test Snack' } });
    fireEvent.change(getByLabelText('Description:'), { target: { value: 'Test description' } });
    fireEvent.change(getByLabelText('Recipe:'), { target: { value: 'Test recipe' } });
    fireEvent.change(getByLabelText('Serve:'), { target: { value: 'Test serve' } });

    // Submit the form
    fireEvent.click(getByText('Submit'));

    // Assert that addItem was called with the correct arguments
    expect(addItemMock).toHaveBeenCalledWith('snack', {
      id: 'test snack',
      name: 'Test Snack',
      description: 'Test description',
      recipe: 'Test recipe',
      serve: 'Test serve',
    });
  });

  test('invalid state changes when submit button is clicked with empty values', () => {
    useNavigate.mockReturnValue(jest.fn());
    const { getByLabelText, getByText } = render(<AddItemForm addItem={() => {}} />);
    
    // Submit the form with empty values
    fireEvent.click(getByText('Submit'));

    // Assert that the corresponding input fields have red borders
    expect(getByLabelText('Type:').style._values.border).toContain('1px solid red');
    expect(getByLabelText('Name:').style._values.border).toContain('1px solid red');
    expect(getByLabelText('Description:').style._values.border).toContain('1px solid red');
    expect(getByLabelText('Recipe:').style._values.border).toContain('1px solid red');
    expect(getByLabelText('Serve:').style._values.border).toContain('1px solid red');
  });
});
