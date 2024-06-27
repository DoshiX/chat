<template>
    <div class="chat-list__wrapper">
        <div class="chat-list" v-for="chat in chats" :key="chat.id">
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

import { useChatStore } from '@/stores/store';

const chatStore = useChatStore();

defineProps({
	chats: {
		type: Array,
		required: true,
	},
	isFullSize: {
		type: Boolean,
		default: true,
	},
});

const selectedChatElement = (chat) => {
	chatStore.selectCurrentChat(chat.id);
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
