<template>
    <div class="chat-wrapper">
        <div class="chat"
            :id="chat.id"
            :class="[{
                        'chat--active': chat.isActive,
                        'chat--small': !isFullSize
                    }]"
        >
            <AvatarComponent
                class="chat__avatar"
                :stubText="GetFirstLetterString(chat.name)"
                :photoName="chat.avatar_url"
            />
                
            <div class="chat__info" v-if="isFullSize">
                <div class="chat__title">
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

                    <span class="chat__date" v-if="chat.lastMessage">{{ chat.lastMessage.date }}</span>
                </div>

                <div class="chat__message" v-if="chat.lastMessage">
                    <span class="chat__message-text">{{ chat.lastMessage.text }}</span>
                
                    <span class="chat__message-count" v-if="chat.unreadMessagesCount !== 0">{{ chat.unreadMessagesCount }}</span>
                </div>
            </div>
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
	isFullSize: {
		type: Boolean,
		default: true,
	},
});
</script>

<style scoped lang="scss">
.chat {
    display: flex;
    align-items: center;
    gap: 16px;

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

    &--small {
        width: fit-content;
    }

    &__info {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        gap: 4px;

        flex-grow: 1;
    }

    &__title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-top: 3px;
    }

    &__avatar {
        cursor: pointer;
    }

    &__name {
        font-weight: 600;

        display: flex;
        align-items: center;
        gap: 4px;

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
        display: flex;
        justify-content: space-between;

        &-text {
            @include line-clamp-text-formated;

            font-size: $chat-message-font-size;
            line-height: $chat-message-line-height;

            -webkit-line-clamp: 1;
            text-overflow: ellipsis;

            color: $chat-message-text-color;
        }

        &-count {
            font-size: $chat-message-count-font-size;
            line-height: $chat-message-count-line-height;

            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;

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

        color: $chat-date-text-color;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
