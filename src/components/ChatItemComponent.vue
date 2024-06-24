<template>
    <div class="chat-wrapper">
        <div class="chat" :id="chat.id" :class="[{ 'chat--active': chat.isActive}]">
            <AvatarComponent
                class="chat__avatar"
                :stubText="GetFirstLetterString(chat.name)"
                :photoName="chat.avatar_url"
            />

            <div class="chat__name">
                <div class="chat__name-text">{{ chat.name }}</div>
                <icon-base
                    v-if="chat.verified"
                    class="chat__name-icon"
                    icon-name="verified"
                    icon-color="#1a9cff"
                    width="18" 
                    height="18"
                />
            </div>

            <span class="chat__message" v-if="chat.lastMessage">{{ chat.lastMessage.text }}</span>
            
            <span class="chat__date" v-if="chat.lastMessage">{{ chat.lastMessage.date }}</span>
            
            <span class="chat__message-count" v-if="chat.lastMessage && chat.unreadMessagesCount !== 0">{{ chat.unreadMessagesCount }}</span>
        </div>
    </div>
</template>

<script setup>
import { GetFirstLetterString } from '@/helpers';
import AvatarComponent from '@/components/AvatarComponent.vue';
import IconBase from '@/components/IconBase.vue';

const props = defineProps ({
	chat: {
		type: Object,
		required: true,
	},
});
</script>

<style scoped lang="scss">
.chat {
    display: grid;
    grid-template-columns: 48px 1fr auto;
    grid-template-rows: 24px 18px;
    grid-template-areas:
        "avatar chatName date"
        "avatar message messageCount";
    align-content: space-around;
    align-items: center;
    column-gap: 16px;

    height: $chat-height;
    width: 100%;
    padding: 12px 16px;

    cursor: pointer;

    background-color: $chat-background-color;

    transition: background-color 250ms ease-in-out;

    &:hover {
        background-color: $chat-background-color-hover;
    }

    &--active {
        background-color: $chat-background-color-active;
    }

    &__avatar {
        grid-area: avatar;

        cursor: pointer;
    }

    &__name {
        font-weight: 600;

        display: flex;
        align-items: center;
        gap: 4px;

        grid-area: chatName;

        &-text {
            @include line-clamp-text-formated;

            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
        }

        &-icon {
            flex-shrink: 0;
        }
    }

    &__message {
        @include line-clamp-text-formated;

        font-size: $chat-message-font-size;
        line-height: $chat-message-line-height;

        grid-area: message;

        -webkit-line-clamp: 1;
        text-overflow: ellipsis;

        color: $chat-message-text-color;

        &-count {
            font-size: $chat-message-count-font-size;
            line-height: $chat-message-count-line-height;

            display: flex;
            align-items: center;
            justify-content: center;

            grid-area: messageCount;
            justify-self: end;

            width: $chat-message-count-size;
            height: $chat-message-count-size;

            color: $chat-message-count-text-color;
            border-radius: 50%;

            background-color: $chat-message-count-background-color;
        }
    }

    &__date {
        font-size: $chat-date-font-size;
        line-height: $chat-date-line-height;

        grid-area: date;
        justify-self: end;

        color: $chat-date-text-color;
    }
}
</style>
