import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import Login from "./Login";
import axios from 'axios';

describe("Login", () => {
  test("renders Login page", () => {
    const matchMedia = () => ({
        matches: false,
        addListener: () => {},
        removeListener: () => {},
      });
      
      window.matchMedia = window.matchMedia || matchMedia;
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  test("Enter Login page values", async () => {
    const matchMedia = () => ({
        matches: false,
        addListener: () => {},
        removeListener: () => {},
      });
      
      window.matchMedia = window.matchMedia || matchMedia;
      const mockAxios = jest.spyOn(axios, "post");
    mockAxios.mockResolvedValueOnce({
      data: {
        success: true,
        message: "Logged in successfully",
        data: "dummyToken",
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText("Email");
    const passInput = screen.getByLabelText("Password");
    const button = screen.getByTestId("login-button");

    fireEvent.change(emailInput, { target: { value: 'abc@mail.com' } });
    fireEvent.change(passInput, { target: { value: 'password' } });
    
    fireEvent.click(button);

    await waitFor(() => {
        expect(mockAxios).toHaveBeenCalledWith(
          "http://localhost:5000/api/users/login",
          {
            email: "abc@mail.com",
            password: "password",
          }
        );

        })
});
afterAll(() => setTimeout(() => process.exit(), 1));
});
