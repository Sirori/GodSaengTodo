import { useId } from "react";
import { oneOf, string, number } from "prop-types";

export function FormInput({
	type = "text",
	name = null,
	placeholder,
	label,
	minLength,
	...restProps
}) {
	const id = useId();

	return (
		<div className="flex flex-row justify-evenly items-center mb-2">
			<label htmlFor={id} className="sr-only">
				{label}
			</label>
			<input
				type={type}
				name={name}
				id={id}
				placeholder={placeholder}
				minLength={minLength}
				className="bg-gray-300 bg-opacity-50 rounded-full w-full pl-6 py-3"
				{...restProps}
				required
			/>
		</div>
	);
}

FormInput.propTypes = {
	type: oneOf(["text", "password", "number", "email", "search"]),
	name: string.isRequired,
	label: string.isRequired,
	placeholder: string.isRequired,
	minLength: number.isRequired,
};
