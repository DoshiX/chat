import GetCurrentStatus from '@/helpers/GetCurrentStatus';
import FormatMessages from '@/helpers/FormatMessages';
import getMessageSentTime from '@/helpers/GetMessageSentTime';

const formatChat = (chat) => {
	const unReadMessagesCount = chat.messages.filter((message)=> !message.read).length;

	const lastMessage = chat.messages.at(-1);

	const formatedChat = {
		id: chat.id,
		...(chat.avatar_url) && { avatar_url: chat.avatar_url },
		...(chat.name) && { name: chat.name },
		verified: chat.verified,
		...(chat.is_active) && { is_active: chat.is_active },
		unread_messages_count: unReadMessagesCount,
		status: GetCurrentStatus({status: chat.status, last_seen_date: chat.last_seen_date}),
		messages: FormatMessages(chat.messages),
	};

	if (lastMessage) 
		formatedChat.last_message = {...lastMessage, sent_time: getMessageSentTime(lastMessage.sent_date)};

	return formatedChat;
};

export default formatChat;
