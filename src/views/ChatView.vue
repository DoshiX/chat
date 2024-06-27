<template>
    <div class="chat-page">
        <div class="chat-page__sidebar">
            <ChatSidebarComponent
                :chats="chatsData"
                :isFullSize="sidebarIsFullSize"
                @sideBarClick="sideBarClickHandler"
            />
        </div>

        <div class="chat-page__messages-content">
            <TopBarComponent class="chat-page__top-bar"
                :chat="currentChat"
				@searchClick="noticeClickHandler"
                @callClick="noticeClickHandler"
                @optionsClick="noticeClickHandler"
            />

            <div class="chat-page__messages-wrapper">
                <div class="chat-page__messages">
                    <div class="chat-page__messages-list">
                        <MessagesListComponent
                            :messages="currentChat.messages"
                        />
                    </div>

                    <div class="chat-page__input-bar">
                        <InputComponent 
                            placeholder="Напишите сообщение"
                            prefixElement
                            suffixElement
                        >
                            <template #prefixElement>
                                <ButtonComponent
                                    prefixIcon
                                    iconName="emoji"
                                    theme="grey"
									@buttonClick="emojiClickHandler"
                                />
                            </template>

                            <template #suffixElement>
                                <ButtonComponent
                                    prefixIcon
                                    iconName="send"
                                    @buttonClick="buttonHandler"
                                />
                            </template>
                        </InputComponent>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ChatSidebarComponent from '@/components/ChatSidebarComponent.vue';
import TopBarComponent from '@/components/TopBarComponent.vue';
import MessagesListComponent from '@/components/MessagesListComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue';
import { useChatStore } from '@/stores/store';
import { storeToRefs } from 'pinia';

const chatStore = useChatStore();

const { getChats: chatsData, getCurrentSelectedChat: currentChat} = storeToRefs(chatStore);

const windowResizeCallBack = (event) => {
	const width = document.body.clientWidth;

	if (width <= 768) 
		sidebarIsFullSize.value = false;
		
};

const buttonHandler = () => {
	console.log('Клик');
};

const noticeClickHandler = () => {
	alert('Данная опция еще не реализована :)');
};
const emojiClickHandler = () => {
	alert('Тут могли быть смайлики');
};

let sidebarIsFullSize = ref(false);

const sideBarClickHandler = () => {
	const width = document.body.clientWidth;
	if (width <= 768) 
		sidebarIsFullSize.value = false;
	else 
		sidebarIsFullSize.value = !sidebarIsFullSize.value;
};

onBeforeMount(()=> {
	chatStore.selectDefaultCurrentChat();
});

onMounted(() => {
	document.body.style.overflow = 'hidden';
	window.addEventListener('resize', windowResizeCallBack);
});

onUnmounted(()=> {
	window.removeEventListener('resize', windowResizeCallBack, false);
});

</script>

<style scoped lang="scss">

.chat-page {
    display: flex;
	
    height: 100%;

    background-color: $chat-page-background-color;

    &__sidebar {
        width: fit-content;
        max-width: $chat-page-sidebar-max-width;

        border-right: 1px solid $chat-page-sidebar-border-color;

        height: 100%;
    }

    &__messages {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-self: flex-end;
		justify-content: flex-end;

        height: 100vh;
        width: 100%;
        max-width: $chat-page-messages-max-width;

        margin-bottom: 23px;

        &-wrapper {  
            display: flex;
            justify-content: center;

			width: 100%;
            height: 100%;
            margin-top: -56px;
        }

        &-content {
            width: 100%;
            height: 100%;
        }

        &-list {
            overflow-y: scroll;
            overflow-x: hidden;

            -ms-overflow-style: none;
            scrollbar-width: none;

            margin: 80px 8px 0;
            padding-top: 16px;
        }
    }

    &__top-bar {
        position: sticky;
		position: -webkit-sticky; 
        top: 0;
    }

    &__input-bar {
        margin: 0 32px;
    }
}
</style>
