import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import PropertyPage from './PropertyPage';

const renderPropertyPage = () => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <PropertyPage 
              favourites={[]} 
              setFavourites={() => {}} 
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: 'prop1' }),
  };
});

describe('PropertyPage - Essential Tests', () => {
  
  //test 01
  test('displays property information correctly', () => {
    renderPropertyPage();
    
    expect(screen.getByText(/£450,000/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Camden Town, London NW1/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/3 Bedroom House/i)).toBeInTheDocument();
  });

  //test 02
  test('navigates between images when clicking buttons', () => {
    renderPropertyPage();
    
    expect(screen.getByText(/1 \/ 6/i)).toBeInTheDocument();
    
    const nextButton = screen.getByRole('button', { name: /Next image/i });
    fireEvent.click(nextButton);
    
    expect(screen.getByText(/2 \/ 6/i)).toBeInTheDocument();
  });

  //test 03
  test('switches between tabs when clicking tab headers', () => {
    renderPropertyPage();
    
    expect(screen.getByText(/Property Description/i)).toBeInTheDocument();
    
    const floorPlanTab = screen.getByText(/Floor Plan/);
    fireEvent.click(floorPlanTab);
    
    const floorPlanHeadings = screen.getAllByText(/Floor Plan/i);
    expect(floorPlanHeadings.length).toBeGreaterThan(1);
  });
});