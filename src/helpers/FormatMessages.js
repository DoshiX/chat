import getMessageSentTime from '@/helpers/GetMessageSentTime';

const formatMessagesByDate = (messages = []) => {
	const today = _getFormatedDate(new Date().toISOString());
	const formatedMessages = {};

	if (!messages.length)
		return {};

	messages.forEach((message)=> {
		const messageDate = _getFormatedDate(message.sent_date);
		if (!(messageDate.full_date in formatedMessages)) {
			formatedMessages[messageDate.full_date] = {
				date_string: messageDate.day === today.day ? 'Сегодня' : `${messageDate.full_date}`,
				messages: [],
			};
		}

		formatedMessages[messageDate.full_date].messages.push({ ...message, sent_time: getMessageSentTime(message.sent_date)});
	});

	return formatedMessages;
};

const _getFormatedDate = (dateString) => {
	const date = new Date(dateString);

	return {
		full_date: ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear(),
		day: date.getDate(),
	};
};

export default formatMessagesByDate;
