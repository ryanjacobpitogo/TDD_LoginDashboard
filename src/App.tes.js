import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import App from './App';

// provide a descriptive details/meaning of the test
describe("This is a Net Pay Solver app", ()=>{

	it("has a header", () => {
		// loads the component into dom
		render(<App />); 
		// screen will allow you to use methods to find something or querying in a page
		// roles = attributes/property eg: <Button /> has a role of button
		// search a role heading in the screen that has a name "Converter" and returns 
		// the matching element
		const header = screen.queryByRole("heading", { name: "NET PAY SOLVER"});
		expect(header).toBeInTheDocument();
	});

	it("has an input field for the income", ()=>{
		// there are multiple ways to check/test an input field
		//
		const { container } = render(<App/>);
		//target only the input element in the container
		const input = container.querySelector("input"); 
		expect(input).toBeInTheDocument();
		//
		const input_ = screen.getByTestId("income");
	    expect(input_).toBeInTheDocument();
	    //check the type of the input field if it's text
	    expect(input_).toHaveAttribute("type", "text");
	});

	it("has an input field for the tax", ()=>{
		// there are multiple ways to check/test an input field
		//
		const { container } = render(<App/>);
		//target only the input element in the container
		const input = container.querySelector("input"); 
		expect(input).toBeInTheDocument();
		//
		const input_ = screen.getByTestId("tax");
	    expect(input_).toBeInTheDocument();
	    //check the type of the input field if it's text
	    expect(input_).toHaveAttribute("type", "text");
	});
	
	it("has a button", ()=>{
		const { container } = render(<App/>);
		//check if a button element exists in dom/page
		const btn = container.querySelector("button");
		expect(btn).toBeInTheDocument();
	});
});

describe("Solve for net pay", ()=>{

	it("Display income subtracted by tax", () => {
		//you can specify which methods to use
		const { getByLabelText, getByTestId } = render(<App />);
		const input = getByLabelText("income");
		const input2 = getByLabelText("tax");
		//mock a onchange method/trigger and specify an input value eg: 1
		fireEvent.change(input, { target: { value: "10000" }});
		expect(input.value).toBe("10000");

		fireEvent.change(input2, { target: { value: "1000" }});
		expect(input2.value).toBe("1000");

		const btn = screen.getByTestId("solve-for-netPay");
		//mock a click method/trigger
    	fireEvent.click(btn);
    	//check if the result after conversion is 1 (income=0.45359237)
    	expect(screen.getByTestId("result-in-netPay")).toHaveTextContent("9000");
	});
	
});
 