import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
	describe("adding a new item", () => {
		beforeEach(() => {
			render(<App />);

			fireEvent.change(screen.getByPlaceholderText("Add new item"), {
				target: { value: "chuck" },
			});

			fireEvent.click(screen.getByText("Add"));
		});

		it("should add an item in the list", () => {
			expect(screen.getByText("chuck")).toBeInTheDocument();
		});

		it("should clear the input after add the item", () => {
			expect(screen.getByPlaceholderText("Add new item")).toHaveValue("");
		});

		it("should check item in the list", () => {
			fireEvent.change(screen.getByPlaceholderText("Add new item"), {
				target: { value: "chuck2" },
			});

			fireEvent.click(screen.getByText("Add"));

			fireEvent.click(screen.getAllByTestId("check-item")[1]);
			expect(screen.getByText("chuck2")).toHaveClass("checked");
		});
	});
});
