<template>
    <div class="chat-list__wrapper">
        <div class="chat-list" v-for="chat in chatsData" :key="chat.id">
            <ChatItemComponent
                :chat="chat"
				:isFullSize="isFullSize"
                @click="selectedChatElement(chat)"
            />
        </div>
    </div>
</template>

<script setup>
import ChatItemComponent from '@/components/ChatItemComponent.vue';

import { ref, onBeforeMount } from 'vue';

const props = defineProps({
	chats: {
		type: Array,
		required: true,
	},
	isFullSize: {
		type: Boolean,
		default: true,
	},
});

const currentSelectedChat = ref(null);
const chatsData = ref(props.chats);

onBeforeMount(()=> {
	chatsData.value = props.chats.map((chat) => formatChat(chat));
});

const formatChat = (chat) => {
	const lastMessage = chat.messages.at(-1);

	const unReadMessagesCount = chat.messages.filter((message)=> !message.read).length;
    
	const formatedChat = {
		id: chat.id,
		...(chat.avatar_url) && { avatar_url: chat.avatar_url },
		...(chat.name) && { name: chat.name },
		verified: chat.verified,
		unreadMessagesCount: unReadMessagesCount,
	};

	formatedChat.isActive = false;

	if (lastMessage) { formatedChat.lastMessage = lastMessage; }

	return formatedChat;
};

const selectedChatElement = (chat) => {
	if (currentSelectedChat.value) {
		currentSelectedChat.value.isActive = false;
	}

	chat.isActive = true;
	currentSelectedChat.value = chat;
};
</script>

<style scoped lang="scss">
.chat-list {
    &__wrapper {
        display: flex;
        flex-direction: column;
    }
}
</style>
