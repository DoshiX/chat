<template>
    <div class="messages__wrapper">
        <div class="messages">
            <div v-for="(messagesByDate, index) in formatMessagesByDate" :key="index"
                class="messages__day-group"
            >
                <div class="messages__date-sent">{{ messagesByDate.date_string }}</div>
                <MessageComponent
                    v-for="message in messagesByDate.messages" :key="message.id"
                    :message="message"
                    :theme="GetIsOddNumber(message.id) ? 'white' : 'green'"
                    :class="[GetIsOddNumber(message.id) ? '' : 'messages__item--rignt','messages__item']"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { GetIsOddNumber } from '@/helpers';
import MessageComponent from '@/components/MessageComponent.vue';

import { computed } from 'vue';

const props = defineProps({
	messages: {
		type: Array,
		required: true,
	},
});

const getFormatedDate = (dateString) => {
	const date = new Date(dateString);

	return {
		full_date: ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear(),
		day: date.getDate(),
	};
}; 

const formatMessagesByDate = computed(() => {
	const today = getFormatedDate(new Date().toISOString());
	const formatedMessages = {};

	props.messages.forEach((message)=> {
		const messageDate = getFormatedDate(message.date);
		if (!(messageDate.full_date in formatedMessages)) {
			formatedMessages[messageDate.full_date] = {
				date_string: messageDate.day === today.day ? 'Сегодня' : `${messageDate.full_date}`,
				messages: [],
			};
		}

		formatedMessages[messageDate.full_date].messages.push(message);
	});

	return formatedMessages;
});
</script>

<style scoped lang="scss">
.messages {
    padding: 24px;

    background-color: $messages-list-background-color;

    &__day-group {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    &__date-sent {
        align-self: center;

        padding: 4px 12px;

        color: $messages-list-date-sent-color;
        border-radius: 12px;
        background-color: $messages-list-date-sent-background-color;
    }

    &__item {
        display: flex;
        flex-direction: column;

        max-width: $messages-list-max-width;

        &--rignt {
            align-self: flex-end;
        }
    }
}
</style>
