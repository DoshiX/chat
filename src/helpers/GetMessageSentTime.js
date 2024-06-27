const getMessageSentTime = (date) => {
	const dateObj = new Date(date);

	return `${dateObj.getHours()}:${dateObj.getMinutes()}`;
};

export default getMessageSentTime;
