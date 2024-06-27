<template>
    <div class="message__wrapper">
        <div :class="[MESSAGE_THEMES[theme], 'message']" :id="message.id">
            <span class="message__text">{{ message.text }}</span>
            
            <div :class="[theme === 'green' ? 'message__info--white' : '', 'message__info']">
                <span class="message__time">{{ message.sent_time }}</span>
                <icon-base
                    icon-name="check"
                    width="14" 
                    height="14"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { MESSAGE_THEMES } from '@/constants';
import IconBase from '@/components/IconBase.vue';

defineProps ({
	message: {
		type: Object,
		required: true,
	},
	theme: {
		type: String,
		default: 'green',
	},
});

</script>

<style scoped lang="scss">
.message {
    display: flex;
    flex-direction: column;
    gap: 4px;

    width: fit-content;
    padding: 4px 12px;

    border-radius: 12px;

    &--white {
        background-color: $message-white-background-color;
    }

    &--green {
        background-color: $message-green-background-color;
    }

    &__info {
        display: flex;
        align-self: flex-end;
        align-items: center;
        gap: 4px;

        height: 16px;

        &--white {
            color: $message-info-color;
        }
    }

    &__text {
        overflow-wrap: break-word;
        word-break: break-all;
    }

    &__time {
        font-size: $message-time-font-size;
        line-height: $message-time-line-height;
    }
}
</style>
