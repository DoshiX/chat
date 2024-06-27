<template>
    <div class="sidebar__wrapper">
        <div :class="[{'sidebar--small' : !isFullSize }, 'sidebar']">
            <div class="sidebar__control-panel">
                <ButtonComponent
                    class="sidebar__button"
                    prefixIcon
                    iconName="menu"
                    theme="grey"
                    :disabled="isDisabledOpenSideBar"
                    @click="$emit('sideBarClick')"
                />

                <div :class="[chatSideBarAnimationState, 'sidebar__search']">
                    <InputComponent 
                        placeholder="Поиск"
                        circle
                        size="small"
                        theme="grey"
                        prefixElement
                        :disabled="chats.length === 0"
                        v-model="model"
                    >
                        <template #prefixElement>
                            <icon-base
                                icon-name="search"
                                icon-color="#707991"
                            />
                        </template>
                    </InputComponent>
                </div>
            </div>

            <div class="sidebar__list" v-if="chats.length !== 0">
                <ChatListComponent 
                    :chats="chats"
                    :isFullSize="isFullSize"
                    :animation="animation"
                    @chatSelect="$emit('chatSelect', $event)"
                />
            </div>

            <div class="sidebar__list-stub" v-if="isFullSize && chats.length === 0">
                Список пуст
            </div>

            <div class="sidebar__list-stub--small" v-if="!isFullSize && chats.length === 0"></div>
        </div>
    </div>
</template>

<script setup>
import IconBase from '@/components/IconBase.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ChatListComponent from '@/components/ChatListComponent.vue';

import { computed } from 'vue';

const model = defineModel();

const props = defineProps({
	chats: {
		type: Array,
		required: true,
	},
	isFullSize: {
		type: [Boolean, null],
		default: true,
	},
	animation: {
		type: Boolean,
		default: false,
	},
	isDisabledOpenSideBar: {
		type: Boolean,
		default: false,
	},
});

const chatSideBarAnimationState = computed(()=> {
	if (props.isFullSize === null) 
		return 'sidebar__search--hidden';
    
	if (props.isFullSize) 
		return 'sidebar__search--animation-open';
	if (!props.isFullSize)
		return 'sidebar__search--animation-close';

	return null;
});

defineEmits(['sideBarClick', 'chatSelect']);
</script>

<style scoped lang="scss">
.sidebar {
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 8px;

    background-color: $sidebar-background-color;

    &--small {
        width: fit-content;
    }

    &__wrapper {
        overflow-y: scroll;
        overflow-x: hidden;
        -ms-overflow-style: none;
        scrollbar-width: none;

        height: 100%;

        background-color: $sidebar-background-color;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &__control-panel {
        position: sticky;
        top: 0;
        right: 0;
        left: 0;
        z-index: $sidebar-control-panel-z-index;

        display: flex;
        align-items: center;
        gap: 16px;

        height: $sidebar-height;
        padding: 8px 16px;

        background: white;
    }

    &__button {
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;

        width: $sidebar-width;
        height: $sidebar-height;
        margin: 0 7px;
    }

    &__search {
        width: 100%;

        &--animation {
            &-open {
                animation: open_sidebar-search .5s ease both;
            }
            &-close {
                animation: close_sidebar-search .5s ease both;
            }
        }

        &--hidden {
            display: none;
        }
    }

    &__list {
        &-stub {
            align-self: center;

            height: 100%;
            margin: $sidebar-stub-margin-top 0 10px;

            &--small {
                width: $sidebar-width-small-size;
            }
        }
    }
}
</style>
