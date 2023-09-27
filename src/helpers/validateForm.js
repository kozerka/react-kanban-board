const hasOnlyLetters = str => /^[a-zA-ZąęśćźżółńĄĘŚĆŻŹÓŁŃ\s]+$/i.test(str);

export const validateForm = (userName, taskName) => {
	const errors = [];

	const userNameWithoutSpaces = userName.trim();
	const taskNameWithoutSpaces = taskName.trim();

	if (userName.length === 0 && taskName.length === 0) {
		errors.push('Both fields must be filled out!');
	} else {
		if (userName.length === 0 || userNameWithoutSpaces.length < 2) {
			errors.push('The "User Name" field must be filled out and contain at least 2 characters!');
		} else if (!hasOnlyLetters(userNameWithoutSpaces)) {
			errors.push('The "User Name" field can only contain letters.');
		}

		if (taskName.length === 0 || taskNameWithoutSpaces.length < 5) {
			errors.push('The "Task" field must be filled out and contain at least 5 characters!');
		}
	}
	return errors.length ? errors.join(' ') : null;
};

export const validateEditTask = taskName => {
	const errors = [];
	const taskNameTrimmed = taskName ? taskName.trim() : '';

	if (taskNameTrimmed.length < 5) {
		errors.push('The "Task" field must be filled out and contain at least 5 characters!');
	}

	return errors.length ? errors.join(' ') : null;
};
