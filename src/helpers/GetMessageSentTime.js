const getMessageSentTime = (date) => {
	const dateObj = new Date(date);

	const hours = dateObj.getHours();
	const minutes = dateObj.getMinutes();

	return `${hours < 10 ? '0' + hours: hours}:${minutes < 10 ? '0' + minutes: minutes}`;
};

export default getMessageSentTime;
