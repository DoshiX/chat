<template>
    <div class="chat-list__wrapper">
        <div class="chat-list" v-for="chat in chats" :key="chat.id">
            <ChatItemComponent
                :chat="chat"
				:isFullSize="isFullSize"
                :animation="animation"
                @click="$emit('chatSelect', chat.id)"
            />
        </div>
    </div>
</template>

<script setup>
import ChatItemComponent from '@/components/ChatItemComponent.vue';

defineProps({
	chats: {
		type: Array,
		required: true,
	},
	isFullSize: {
		type: Boolean,
		default: true,
	},
	animation: {
		type: Boolean,
		default: false,
	},
});

</script>

<style scoped lang="scss">
.chat-list {
    &__wrapper {
        display: flex;
        flex-direction: column;
    }
}
</style>
