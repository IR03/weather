import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "../Pages/Search";


describe("Search Page Component Testing", () => {



   

    test('check input label', () => {
        render(<Search />)
        const textField = screen.getByRole('textbox', { name: 'Enter Country Name' })
        expect(textField).toBeInTheDocument();
    });

        
    test("input value check", () => {
        render(<Search />);

        const inputValue = screen.getByTestId("inputField");
        userEvent.type(inputValue, "usa");
        expect(inputValue).toHaveValue("usa");
    });

    test('check button', () => {
        render(<Search />);
        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();
    });

    test("submit button enables condition check", () => {
        render(<Search />);

        const inputValue = screen.getByTestId("inputField");
        const submit = screen.getByTestId("submit_button");

        fireEvent.change(inputValue, { target: { value: "usa" } });

        expect(submit).not.toHaveClass("Mui-disabled");
    });

})