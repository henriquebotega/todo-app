import React, { useState } from "react";

const ItemLabel = ({ item, handleCheck, handleModeEdit, handleDelete }) => {
	return (
		<>
			<input
				data-testid="check-item"
				type="checkbox"
				value={item.checked}
				onChange={() => handleCheck(item.id)}
			/>

			{item.value}

			<div>
				<button
					disabled={item.checked}
					data-testid="btn-edit-item"
					onClick={() => handleModeEdit()}
				>
					Edit
				</button>

				<button
					disabled={item.checked}
					data-testid="btn-del-item"
					onClick={() => handleDelete(item.id)}
				>
					Delete
				</button>
			</div>
		</>
	);
};

const ItemInput = ({ value, setValue, setModeEdit, handleSave }) => {
	return (
		<>
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Edit item"
			/>

			<div>
				<button
					data-testid="btn-cancel-edit"
					onClick={() => setModeEdit(false)}
				>
					Cancel
				</button>

				<button data-testid="btn-save-edit" onClick={() => handleSave()}>
					Save
				</button>
			</div>
		</>
	);
};

const Item = ({ item, handleCheck, handleDelete, handleEdit }) => {
	const [modeEdit, setModeEdit] = useState(false);
	const [value, setValue] = useState("");

	const handleModeEdit = () => {
		setValue(item.value);
		setModeEdit(true);
	};

	const handleSave = () => {
		handleEdit(item.id, value);
		setModeEdit(false);
	};

	return (
		<li className={item.checked ? "checked" : ""}>
			{!modeEdit && (
				<ItemLabel
					item={item}
					handleCheck={handleCheck}
					handleModeEdit={handleModeEdit}
					handleDelete={handleDelete}
				/>
			)}

			{modeEdit && (
				<ItemInput
					value={value}
					setValue={setValue}
					setModeEdit={setModeEdit}
					handleSave={handleSave}
				/>
			)}
		</li>
	);
};

export default Item;
