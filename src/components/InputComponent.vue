<template>
    <div class="input-wrapper">

        <div class="input__slot-wrapper input__slot--prefix" v-if="prefixElement">
            <div class="input__slot">
                <slot name="prefixElement"/>
            </div>
        </div>

        <div class="input__slot-wrapper input__slot--suffix" v-if="suffixElement">
            <div class="input__slot">
                <slot name="suffixElement"/>
            </div>
        </div>

        <input
            v-model="model"
            :class="[
                        inputModifiersClass,
                        INPUT_SIZES[size],
                        INPUT_THEMES[theme],
                        'input'
                    ]"
            :placeholder="placeholder"
            :disabled="disabled"
        >

    </div>
</template>

<script setup>
import { INPUT_THEMES, INPUT_SIZES } from '@/constants';

const props = defineProps({
	placeholder: {
		type: String,
		default: 'Введите текст',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	size: {
		type: String,
		default: 'medium',
	},
	theme: {
		type: String,
	},
	circle: {
		type: Boolean,
		default: false,
	},
	prefixElement: {
		type: Boolean,
		default: false,
	},
	suffixElement: {
		type: Boolean,
		default: false,
	},
});

const model = defineModel();

const inputModifiersClass = {
	'input--circle': props.circle,
	'input--prefix-element': props.prefixElement,
	'input--suffix-element': props.suffixElement,
};
</script>

<style scoped lang="scss">
.input {
    width: 100%;
    padding: 8px 16px;

    text-overflow: ellipsis;

    color: $input-text-color;
    border: none;
    outline: none;
    border-radius: 12px;
    background-color: $input-default-background-color;

    &-wrapper {
        position: relative;

        display: flex;
    }

    &__slot {
        display: flex;
        flex-direction: column;
        justify-content: center;

        height: inherit;

        &-wrapper {
            position: absolute;
            
            height: 100%;
        }

        &--prefix {
            left: 16px;
        }

        &--suffix {
            right: 16px;
        }
    }

    &--grey {
        background-color: $input-grey-background-color;
    }

    &--small {
        height: $input-small-height;
    }

    &--medium {
        height: $input-medium-height;
    }

    &--circle {
        border-radius: 22px;
    }

    &--prefix-element {
        padding-left: 56px;
    }

    &--suffix-element {
        padding-right: 56px;
    }

    &::placeholder {
        color: $input-text-placeholder-color;
        overflow: hidden;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}
</style>
