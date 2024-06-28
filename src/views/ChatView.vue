<template>
    <div class="chat-page">
        <div class="chat-page__sidebar">
            <ChatSidebarComponent
                :class=[chatSideBarAnimationState]
                :isFullSize="sidebarIsFullSize"
                animation
                :chats="chatsData"
                :isDisabledOpenSideBar="isDisabledOpenSideBar"
                v-model="search_string"
                @sideBarClick="sideBarClickHandler"
                @chatSelect="chatSelectHandler"
            />
        </div>

        <div class="chat-page__messages-content" v-if="currentChat">
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
							v-model.trim="msg"
                            placeholder="Напишите сообщение"
                            prefixElement
                            suffixElement
							@focus_changed="inputFocusHandler"
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
                                    @buttonClick="sendMessageHandler"
                                    :disabled="!msg.length"
                                />
                            </template>
                        </InputComponent>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="chat-page__messages-stub">У вас нет чатов для начала диалога</div>
    </div>
</template>

<script setup>
import ChatSidebarComponent from '@/components/ChatSidebarComponent.vue';
import TopBarComponent from '@/components/TopBarComponent.vue';
import MessagesListComponent from '@/components/MessagesListComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { ref, computed, onMounted, onUnmounted, onBeforeMount, onUpdated } from 'vue';
import { useChatStore } from '@/stores/store';
import { storeToRefs } from 'pinia';

const chatStore = useChatStore();

const { getChats: chatsData, getCurrentSelectedChat: currentChat, search_string} = storeToRefs(chatStore);

const msg = ref('');

const sidebarIsFullSize = ref(null);

const isDisabledOpenSideBar = ref(false);

const messageListEl = ref(null);

const chatSideBarAnimationState = computed(()=> {
	if (sidebarIsFullSize.value === null) 
		return null;

	return sidebarIsFullSize.value ? 'chat-page__sidebar--animation-open' : 'chat-page__sidebar--animation-close';
});

const chatSelectHandler = (chat_id) => {
	chatStore.selectCurrentChat(chat_id);
	msg.value = '';
};

onBeforeMount(()=> {
	chatStore.selectDefaultCurrentChat();
});

onMounted(() => {
	window.addEventListener('resize', windowResizeCallBack);
	messageListEl.value = document.querySelector('.chat-page__messages-list');

	if (checkIsWindowWidthTablet()) isDisabledOpenSideBar.value = true;
	else isDisabledOpenSideBar.value = false;
});

onUnmounted(()=> {
	window.removeEventListener('resize', windowResizeCallBack);
});

onUpdated(()=> {
	_scrollToBottom();
});

const _scrollToBottom = () => {
	messageListEl.value.scrollTo(0, messageListEl.value.scrollHeight);
};

const windowResizeCallBack = () => {
	if (checkIsWindowWidthTablet()) {
		isDisabledOpenSideBar.value = true;

		if (typeof sidebarIsFullSize.value === 'boolean')
			return sidebarIsFullSize.value = false;

		return;
	}
	isDisabledOpenSideBar.value = false;
};

const checkIsWindowWidthTablet = () => {    
	return document.body.clientWidth <= 768;
};

const sideBarClickHandler = () => {
	if (checkIsWindowWidthTablet()) {
		if (typeof sidebarIsFullSize.value === 'boolean')
			return sidebarIsFullSize.value = false;

		return;
	}
	sidebarIsFullSize.value = !sidebarIsFullSize.value;
};

const inputFocusHandler = (isFocused) => {
	if (isFocused) 
		window.addEventListener('keypress', _keypressListener);
	else 
		window.removeEventListener('keypress', _keypressListener);
	
};

const _keypressListener = (e) => {
	if (e.key === 'Enter') 
		sendMessageHandler();
};

const sendMessageHandler = () => {
	if (!msg.value.length) 
		return;

	chatStore.sendMessage(msg.value);
	msg.value = '';
};

const noticeClickHandler = () => {
	alert('Данная опция еще не реализована :)');
};
const emojiClickHandler = () => {
	alert('Тут могли быть смайлики');
};

</script>

<style scoped lang="scss">
.chat-page {
    display: flex;

    overflow: hidden;
	
    height: 100%;

    background-color: $chat-page-background-color;

    &__sidebar {
        max-width: $chat-page-sidebar-max-width;

        border-right: 1px solid $chat-page-sidebar-border-color;

        height: 100%;

        &--animation {
            &-open {
                animation: sidebar_open .3s ease both;
            }

            &-close {
                animation: sidebar_close .3s ease both;
            }
        }
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

        &-stub {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 1;

            color: $chat-page-messages-background-color;
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
