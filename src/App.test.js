import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import React from "react";
import AutocompleteUsingAPI from "./AutocompleteUsingAPI";
import AutocompleteUsingDummyData from "./AutocompleteUsingDummyData";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("AutocompleteUsingAPI", () => {
  test("displays options when input is clicked", () => {
    render(<AutocompleteUsingAPI />);
    const inputElement = screen.getByPlaceholderText("Type to search");

    fireEvent.click(inputElement);

    const optionsContainer = screen.getByTestId("options-container");
    expect(optionsContainer).toBeInTheDocument();
  });

  test("filters options based on input value", () => {
    render(<AutocompleteUsingAPI />);
    const inputElement = screen.getByPlaceholderText("Type to search");

    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "Leanne" } });

    const options = screen.getAllByTestId("option");
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent("Leanne");
  });

  test("updates search value when an option is selected", () => {
    render(<AutocompleteUsingAPI />);
    const inputElement = screen.getByPlaceholderText("Type to search");

    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "Leanne" } });

    const optionElement = screen.getByText("Leanne");
    fireEvent.click(optionElement);

    expect(inputElement.value).toBe("Leanne");
  });
});

describe("AutocompleteUsingDummyData", () => {
  test("displays autocomplete options when input is changed", () => {
    const states = ["Alabama", "Alaska", "Arizona", "Arkansas"];
    render(<AutocompleteUsingDummyData states={states} />);
    const inputElement = screen.getByPlaceholderText("Search US states here ...");

    fireEvent.change(inputElement, { target: { value: "A" } });

    const autocompleteOptions = screen.getAllByTestId("autocomplete-option");
    expect(autocompleteOptions).toHaveLength(3); // Alabama, Alaska, Arizona
  });

  test("selects an option when clicked", () => {
    const states = ["Alabama", "Alaska", "Arizona", "Arkansas"];
    render(<AutocompleteUsingDummyData states={states} />);
    const inputElement = screen.getByPlaceholderText("Search US states here ...");

    fireEvent.change(inputElement, { target: { value: "A" } });

    const optionElement = screen.getByText("Alabama");
    fireEvent.click(optionElement);

    expect(inputElement.value).toBe("Alabama");
  });

  test("selects an option when Enter key is pressed", () => {
    const states = ["Alabama", "Alaska", "Arizona", "Arkansas"];
    render(<AutocompleteUsingDummyData states={states} />);
    const inputElement = screen.getByPlaceholderText("Search US states here ...");

    fireEvent.change(inputElement, { target: { value: "A" } });
    fireEvent.keyDown(inputElement, { keyCode: 13 }); // Enter key

    expect(inputElement.value).toBe("Alabama");
  });

  test("navigates through options using Up and Down arrow keys", () => {
    const states = ["Alabama", "Alaska", "Arizona", "Arkansas"];
    render(<AutocompleteUsingDummyData states={states} />);
    const inputElement = screen.getByPlaceholderText("Search US states here ...");

    fireEvent.change(inputElement, { target: { value: "A" } });
    fireEvent.keyDown(inputElement, { keyCode: 40 }); // Down arrow key
    fireEvent.keyDown(inputElement, { keyCode: 40 }); // Down arrow key

    const secondOption = screen.getByText("Arizona");
    expect(secondOption).toHaveClass("active");

    fireEvent.keyDown(inputElement, { keyCode: 38 }); // Up arrow key

    const firstOption = screen.getByText("Alabama");
    expect(firstOption).toHaveClass("active");
  });
});
