import React from "react";
import { render, fireEvent, queryByText } from "@testing-library/react";
import ContactForm from './ContactForm';

test("checks if inputs are working and submit fires with no error messages", async () => {
  const { getByLabelText, findByTestId, queryByTestId } = render(<ContactForm />);
  const firstName = getByLabelText(/first name/i);
  const lastName = getByLabelText(/last name/i);
  const email = getByLabelText(/email/i);
  const message = getByLabelText(/message/i);
  const dropdown = getByLabelText(/how did you hear about us/i);
  const button = getByLabelText(/submit/i);

  fireEvent.change(firstName, { target: { value: "David" } });
  fireEvent.change(lastName, { target: { value: "Smith" } });
  fireEvent.change(email, { target: { value: "davidsmith@email.com" } });
  fireEvent.change(message, { target: { value: "lorem ipsum" } });
  fireEvent.change(dropdown, { target: { value: "pidgeon" } });

  expect(firstName.value).toBe("David");
  expect(lastName.value).toBe("Smith");
  expect(email.value).toBe("davidsmith@email.com");
  expect(message.value).toBe("lorem ipsum");
  expect(dropdown.value).toBe('pidgeon');

  fireEvent.submit(button);

  expect(await findByTestId(/json/i)).toHaveTextContent(`{ "firstName": "David", "lastName": "Smith", "email": "davidsmith@email.com", "message": "lorem ipsum", "dropdown": "pidgeon" }`)
  expect(queryByTestId(/first-name-error/i)).toBeNull();
  expect(queryByTestId(/last-name-error/i)).toBeNull();
  expect(queryByTestId(/email-error/i)).toBeNull();
});

test("checks if errors messages are coming up", async () => {
  const { getByLabelText, findByTestId, queryByTestId } = render(<ContactForm />);
  const firstName = getByLabelText(/first name/i);
  const lastName = getByLabelText(/last name/i);
  const email = getByLabelText(/email/i);
  const button = getByLabelText(/submit/i);

  fireEvent.change(firstName, { target: { value: "" } });
  fireEvent.change(lastName, { target: { value: "" } });
  fireEvent.change(email, { target: { value: "" } });

  expect(firstName.value).toBe("");
  expect(lastName.value).toBe("");
  expect(email.value).toBe("");
  expect(message.value).toBe("");

  fireEvent.submit(button);

  expect(queryByTestId(/json/i)).toBeNull();

  expect(await findByTestId(/first-name-error/i)).toHaveTextContent("Looks like there was an error: required");
  expect(await findByTestId(/last-name-error/i)).toHaveTextContent("Looks like there was an error: required");
  expect(await findByTestId(/email-error/i)).toHaveTextContent("Looks like there was an error: required");

  fireEvent.change(firstName, { target: { value: "D" } });
  fireEvent.submit(button);

  expect(await findByTestId(/first-name-error/i)).toHaveTextContent("Looks like there was an error: minLength");
});