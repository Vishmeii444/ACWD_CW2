import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import SearchPage from './SearchPage';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('SearchPage - Essential Tests', () => {
  
  //test 01
  test('renders search form with all input fields', () => {
    renderWithRouter(
      <SearchPage favourites={[]} setFavourites={() => {}} />
    );
    
    expect(screen.getByText(/Search Properties/i)).toBeInTheDocument();
    expect(screen.getByText(/Property Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/Price Range/i)).toBeInTheDocument();
    expect(screen.getByText(/Postcode/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  //test02
  test('displays search results when search button is clicked', () => {
    renderWithRouter(
      <SearchPage favourites={[]} setFavourites={() => {}} />
    );
    
    const searchButton = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(searchButton);
    
    expect(screen.getByText(/Properties Found/i)).toBeInTheDocument();
  });

  //test03
  test('adds property to favourites when save button is clicked', () => {
    const mockSetFavourites = vi.fn();
    
    renderWithRouter(
      <SearchPage 
        favourites={[]} 
        setFavourites={mockSetFavourites} 
      />
    );
    
    const searchButton = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(searchButton);
    
    const saveButtons = screen.getAllByRole('button', { name: /Save/i });
    fireEvent.click(saveButtons[0]);
    
    expect(mockSetFavourites).toHaveBeenCalled();
  });
});