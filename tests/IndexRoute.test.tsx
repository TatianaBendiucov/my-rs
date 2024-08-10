import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Index, { loader as indexLoader } from "../app/routes/index";

jest.mock("@remix-run/react", () => ({
  redirect: jest.fn(() => ({
    status: 302,
    headers: { Location: '/search' },
  })),
}));

describe("Index Route", () => {
  it("should redirect to /search", async () => {

    const response = await indexLoader();

    expect(response).toEqual({
      status: 302,
      headers: {
        Location: '/search',
      },
    });
  });
  
  it("should render nothing", () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<div>Search Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Search Page')).not.toBeInTheDocument();
  });
});