<template>
    <div class="sidebar__wrapper">
        <div :class="[{'sidebar--small' : !isFullSize }, 'sidebar']">
            <div class="sidebar__control-panel">
                <ButtonComponent
                    class="sidebar__button"
                    prefixIcon
                    iconName="menu"
                    theme="grey"
                    @click="$emit('sideBarClick')"
                />

                <div class="sidebar__search" v-if="isFullSize">
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
                    @chatSelect="$emit('chatSelect', $event)"
                />
            </div>

            <div class="sidebar__list-stub" v-if="isFullSize && chats.length === 0">
                Список пуст
            </div>

            <div class="sidebar__list-stub--small" v-if="!isFullSize"></div>
        </div>
    </div>
</template>

<script setup>
import IconBase from '@/components/IconBase.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ChatListComponent from '@/components/ChatListComponent.vue';

const model = defineModel();

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

defineEmits(['sideBarClick', 'chatSelect']);
</script>

<style scoped lang="scss">
.sidebar {
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 8px;

    height: 100%;

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

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &__control-panel {
        position: sticky;
        top: 0;
        right: 0;
        left: 0;

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
    }

    &__list {
        &-stub {
            align-self: center;

            margin: $sidebar-stub-margin-top 0 10px;

            &--small {
                width: $sidebar-width-small-size;
            }
        }
    }
}
</style>
