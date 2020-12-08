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

			expect(screen.getAllByTestId("btn-edit-item")[1]).toBeDisabled();

			expect(screen.getAllByTestId("btn-del-item")[1]).toHaveAttribute(
				"disabled"
			);
		});

		it("should delete item in the list", () => {
			fireEvent.change(screen.getByPlaceholderText("Add new item"), {
				target: { value: "chuck2" },
			});

			fireEvent.click(screen.getByText("Add"));

			fireEvent.change(screen.getByPlaceholderText("Add new item"), {
				target: { value: "chuck3" },
			});

			fireEvent.click(screen.getByText("Add"));

			expect(screen.getByText("chuck3")).toBeInTheDocument();

			fireEvent.click(screen.getAllByTestId("btn-del-item")[2]);
			expect(screen.queryByText("chuck3")).toBeNull();
		});

		it("should edit item in the list", () => {
			fireEvent.click(screen.getAllByTestId("btn-edit-item")[0]);

			expect(screen.getByTestId("btn-cancel-edit")).toBeTruthy();

			fireEvent.change(screen.getByPlaceholderText("Edit item"), {
				target: { value: "chuck-changed" },
			});

			fireEvent.click(screen.getAllByTestId("btn-save-edit")[0]);

			expect(screen.getByText("chuck-changed")).toBeInTheDocument();
			expect(screen.getByTestId("btn-add")).toBeTruthy();
		});
	});
});
