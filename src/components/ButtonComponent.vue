<template>
    <div>
        <button
            :class="[BUTTON_THEMES[theme], 'button']"
            :type="type"
            :disabled="disabled"
            @click="$emit('buttonClick')"
        >
            <icon-base
                v-if="iconName && prefixIcon"
                :icon-name="iconName"
                :width="widthIcon"
                :height="heightIcon"
            />

            {{ text }}
            
            <icon-base
                v-if="iconName && suffixIcon"
                :icon-name="iconName"
                :width="widthIcon"
                :height="heightIcon"
            />

        </button>
    </div>
</template>

<script setup>
import IconBase from '@/components/IconBase.vue';
import { BUTTON_THEMES } from '@/constants';

defineProps({
	type: {
		type: String,
		default: 'button',
	},
	text: {
		type: String,
	},
	disabled: {
		type: Boolean,
	},
	theme: {
		type: String,
		default: 'blue',
	},
	iconName: {
		type: String,
	},
	prefixIcon: {
		type: Boolean,
		default: false,
	},
	suffixIcon: {
		type: Boolean,
		default: false,
	},
	widthIcon: {
		type: [Number, String],
	},
	heightIcon: {
		type: [Number, String],
	},
});
</script>

<style scoped lang="scss">
.button {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;

    padding: 0;

    cursor: pointer;

    text-decoration: none;
    white-space: nowrap;
    vertical-align: middle;

    border: none;

    background-color: transparent;

    transition: color 250ms ease-in-out;

    &--blue {
        color: $button-blue-color;

        &:hover {
            color: $button-blue-color-hover;
        }
    }

    &--grey {
        color: $button-grey-color;

        &:hover {
            color: $button-grey-color-hover;
        }
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        color: $button-color-disabled;
    }
}
</style>
