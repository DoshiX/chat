<template>
    <div class="messages__wrapper">
        <div class="messages" v-if="Object.keys(messages).length !== 0">
            <div v-for="(messagesByDate, index) in messages" :key="index"
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

        <div v-else class="messages__stub">Список сообщений пуст</div>
    </div>
</template>

<script setup>
import { GetIsOddNumber } from '@/helpers';
import MessageComponent from '@/components/MessageComponent.vue';

const props = defineProps({
	messages: {
		type: Object,
		required: true,
	},
});
</script>

<style scoped lang="scss">
.messages {
    padding: 0 24px;

    background-color: $messages-list-background-color;

    &__day-group {
        display: flex;
        flex-direction: column;
        gap: 18px;
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

    &__stub {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        color: $messages-list-stub-color;
    }
}
</style>
