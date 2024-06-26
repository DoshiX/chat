<template>
    <div class="sidebar__wrapper">
        <div :class="[{'sidebar--small' : !sidebarIsFullSize }, 'sidebar']">
            <div class="sidebar__control-panel">
                <ButtonComponent
                    prefixIcon
                    iconName="menu"
                    theme="grey"
                    @click="sidebarClickHandler"
                />

                <div class="sidebar__search" v-if="sidebarIsFullSize">
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
                    :isFullSize="sidebarIsFullSize"
                />
            </div>

            <div class="sidebar__list-stub" v-if="sidebarIsFullSize && chats.length === 0">
                Список пуст
            </div>

            <div class="sidebar__list-stub--small" v-if="!sidebarIsFullSize"></div>
        </div>
    </div>
</template>

<script setup>
import IconBase from '@/components/IconBase.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ChatListComponent from '@/components/ChatListComponent.vue';

import { ref } from 'vue';

const model = defineModel();

const props = defineProps ({
	chats: {
		type: Array,
		required: true,
	},
});

let sidebarIsFullSize = ref(true);

const sidebarClickHandler = () => {
	sidebarIsFullSize.value = !sidebarIsFullSize.value;
};
</script>

<style scoped lang="scss">
.sidebar {
    position: relative;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    background-color: $sidebar-background-color;

    &--small {
        width: fit-content;
    }

    &__wrapper {
        height: 100%;
    }

    &__control-panel {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;

        display: flex;
        align-items: center;
        gap: 18px;

        height: $sidebar-height;
        padding: 8px 16px;
    }

    &__search {
        width: 100%;
    }

    &__list {
        overflow: auto;

        -ms-overflow-style: none;
        scrollbar-width: none;

        margin-top: $sidebar-list-margin-top;

        &::-webkit-scrollbar {
            display: none;
        }
        
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
