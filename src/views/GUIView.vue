<template>
    <div class="gui-page">
        <header class="gui-page__header">
            <h1>Библиотека компонентов для chat</h1>
        </header>

        <main class="gui-page__content">
            <div class="gui-page__component-list">
                <div class="gui-page__component-item">
                    <h3 class="gui-page__component-title">Иконки</h3>
                    <div class="gui-page__component-icons">
                        <icon-base icon-name="call" />
                        <icon-base icon-name="emoji" />
                        <icon-base icon-name="check" />
                        <icon-base icon-name="menu" />
                        <icon-base icon-name="more" />
                        <icon-base icon-name="search" />
                        <icon-base icon-name="send" />
                        <icon-base icon-name="verified" />
                    </div>
                </div>

                <div class="gui-page__component-item">
                    <h3 class="gui-page__component-title">Кнопки</h3>
                    <div class="gui-page__component-button">
                        <ButtonComponent
                            text="Кнопка с иконкой слева"
                            prefixIcon
                            iconName="call"
                            widthIcon="15"
                            heightIcon="15"
                        />
                        <ButtonComponent
                            text="Кнопка с иконкой справа"
                            suffixIcon
                            iconName="call"
                            widthIcon="15"
                            heightIcon="15"
                        />
                        <ButtonComponent
                            text="Кнопка с темой blue по умолчанию"
                            prefixIcon
                            iconName="call"
                            widthIcon="15"
                            heightIcon="15"
                        />
                        <ButtonComponent
                            text="Кнопка с темой grey"
                            suffixIcon
                            iconName="call"
                            widthIcon="15"
                            heightIcon="15"
                            theme="grey"
                        />
                        <ButtonComponent
                            text="Отключенная кнопка"
                            prefixIcon
                            iconName="call"
                            widthIcon="15"
                            heightIcon="15"
                            disabled
                        />
                    </div>
                </div>

                <div class="gui-page__component-item">
                    <h3 class="gui-page__component-title">Поля ввода</h3>
                    <div class="gui-page__component-input">
                        <InputComponent
                            v-model="msg"
                        />

                        <InputComponent 
                            placeholder="Поиск"
                            circle
                            size="small"
                            theme="grey"
                            prefixElement
                        >
                            <template #prefixElement>
                                <icon-base
                                    icon-name="search"
                                    icon-color="#707991"
                                />
                            </template>
                        </InputComponent>

                        <InputComponent 
                            placeholder="Напишите сообщение"
                            prefixElement
                            suffixElement
                        >
                            <template #prefixElement>
                                <icon-base
                                    icon-name="emoji"
                                    icon-color="#707991"
                                />
                            </template>

                            <template #suffixElement>
                                <icon-base
                                    icon-name="send"
                                    icon-color="#8BABD8"
                                />
                            </template>
                        </InputComponent>

                        <InputComponent 
                            placeholder="Отключенный ввод"
                            disabled
                        />
                    </div>
                </div>

                <div class="gui-page__component-item">
                    <h3 class="gui-page__component-title">Аватар</h3>
                    <div class="gui-page__component-avatar">
                        <AvatarComponent photoName="avatar-5.jpg" size="small" />
                        <AvatarComponent photoName="avatar-5.jpg" />

                        <AvatarComponent size="small" stubText="Текст"/>
                        <AvatarComponent stubText="Текст"/>
                    </div>
                </div>

                <div class="gui-page__component-item">
                    <h3 class="gui-page__component-title">Чат</h3>
                    <div class="gui-page__component-chat" v-for="chat in chatsData" :key="chat.id">
                        <ChatItemComponent
                            :chat="formatChat(chat)"
                        />
                    </div>
                </div>

                <div class="gui-page__component-item">
                    <h3 class="gui-page__component-title">Список чатов</h3>
                    <div class="gui-page__component-chat-list">
                        <ChatListComponent 
                            :chats="chatsData"
                        />
                    </div>
                </div>

                <div class="gui-page__component-item">
                    <h3 class="gui-page__component-title">Top bar</h3>
                    <div class="gui-page__component-top-bar">
                        <TopBarComponent
                            :user="chatsData[5]"
                            @searchClick="searchClickHandler"
                            @callClick="callClickHandler"
                            @optionsClick="optionsClickHandler"
                        />
                    </div>
                </div>

                <div class="gui-page__component-item">
                    <h3 class="gui-page__component-title">Message</h3>
                    <div class="gui-page__component-message">
                        <MessageComponent
                            :message="chatsData[5].messages[0]"
                        />
                        <MessageComponent
                            :message="chatsData[5].messages[0]"
                            theme="white"
                        />
                    </div>
                </div>

                <div class="gui-page__component-item">
                    <h3 class="gui-page__component-title">Messages List</h3>
                    <div class="gui-page__component-message-list">
                        <MessagesListComponent
                            :messages="chatsData[5].messages"
                        />
                    </div>
                </div>

                <div class="gui-page__component-item">
                    <h3 class="gui-page__component-title">Sidebar</h3>
                    <div class="gui-page__component-sidebar">
                        <ChatSidebarComponent
                            v-model="searchSidebar"
                            :chats="chatsData"
                        />
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import IconBase from '@/components/IconBase.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import AvatarComponent from '@/components/AvatarComponent.vue';
import ChatItemComponent from '@/components/ChatItemComponent.vue';
import ChatListComponent from '@/components/ChatListComponent.vue';
import TopBarComponent from '@/components/TopBarComponent.vue';
import MessageComponent from '@/components/MessageComponent.vue';
import MessagesListComponent from '@/components/MessagesListComponent.vue';
import ChatSidebarComponent from '@/components/ChatSidebarComponent.vue';

import { ref } from 'vue';

const msg = ref('Hello World!');
const searchSidebar = ref('');

const formatChat = (chat) => {
	const lastMessage = chat.messages.at(-1);

	const unReadMessagesCount = chat.messages.filter((message)=> !message.read).length;
    
	const formatedChat = {
		id: chat.id,
		...(chat.avatar_url) && { avatar_url: chat.avatar_url },
		...(chat.name) && { name: chat.name },
		verified: chat.verified,
		unreadMessagesCount: unReadMessagesCount,
	};

	if (lastMessage) { formatedChat.lastMessage = lastMessage; }

	return formatedChat;
};

const chatsData = ref([
	{
		id: 1,
		avatar_url: '',
		name: 'New chat',
		verified: false,
		messages: [],
	},
	{
		id: 2,
		avatar_url: 'avatar-7.jpg',
		name: 'New chat',
		verified: false,
		messages: [
			{
				id: 1,
				text: 'message',
				date: '14:00',
				read: true,
			},
		],
	},
	{
		id: 3,
		avatar_url: 'avatar-1.jpg',
		name: 'Чат 2',
		verified: false,
		messages: [
			{
				id: 1,
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				date: '18:28',
			},
			{
				id: 2,
				text: 'Ок, увидимся',
				date: '18:30',
			},
		],
	},
	{
		id: 4,
		avatar_url: 'avatar-5.jpg',
		name: 'New chat',
		verified: false,
		messages: [
			{
				id: 1,
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				date: '20:30',
			},
		],
	},
	{
		id: 5,
		avatar_url: '',
		name: 'Satoru Gojo',
		verified: true,
		messages: [
			{
				id: 1,
				text: 'Прибыл',
				date: '20:31',
				read: true,
			},
		],
	},
	{
		id: 6,
		avatar_url: 'avatar-2.png',
		name: 'David Moore',
		verified: true,
		online_status: 'в сети 5 мин назад',
		messages: [
			{
				id: 1,
				text: 'Тестовое сообщение😐',
				date: '2024-06-24T11:30:38.538Z',
			},
			{
				id: 2,
				text: 'Привет, все работает',
				date: '2024-06-24T11:31:38.538Z',
			},
			{
				id: 3,
				text: 'Ну все, можно расходиться 😄',
				date: '2024-06-24T11:32:38.538Z',
			},
		],
	},
]);

const searchClickHandler = () => {
	console.log('Клик по поиску');
};
const callClickHandler = () => {
	console.log('Клик по трубке');
};
const optionsClickHandler = () => {
	console.log('Клик по опциям');
};

</script>

<style scoped lang="scss">
.gui-page {
    display: flex;
    flex-direction: column;

    min-height: 100vh;
    max-width: 1280px;
    margin: 0 auto;

    &__header {
        line-height: 30px;
        
        position: fixed;
        top: 0;
        right: 0;
        left: 0;

        display: flex;
        align-items: center;

        max-width: 1280px;
        height: 110px;
        margin: 0 auto;
        padding: 0 20px;

        border-bottom: 1px solid #eaecef;
        background-color: white;

        z-index: 10;

        @media #{$screen-tablet} {
            height: 70px;
        }
    }

    &__content {
        flex-grow: 1;

        margin-top: 120px;
        padding: 0 20px;

        @media #{$screen-tablet} {
            margin-top: 80px;
        }
    }

    &__component {
        &-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        &-item {
            display: flex;
            flex-direction: column;
            gap: 10px;

            padding-bottom: 10px;

            border-bottom: 1px dashed #eaecef;

            &:last-child {
                margin-bottom: 70px;
            }
        }

        &-title {
            color: #8f8fff;
        }

        &-icons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        &-button {            
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
        }

        &-input {
            display: flex;
            flex-direction: column;
            gap: 10px;

            padding: 20px;

            background-color: #8f8fff26;
            border-radius: 12px;
        }

        &-avatar {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        &-chat {
            display: flex;
            flex-direction: column;
            gap: 10px;

            padding: 20px;

            background-color: #8f8fff26;
            border-radius: 12px;

            &-list {
                border: 1px solid  #8f8fff26;
                background-color: #8f8fff26;
            }
        }

        &-top-bar {
            padding: 20px;

            background-color: #8f8fff26;
            border-radius: 12px;
        }

        &-message {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 20px;

            background-color: #8f8fff26;
            border-radius: 12px;
            
            &-list {
                padding: 20px;

                background-color: #8f8fff26;
                border-radius: 12px;
            }
        }

        &-sidebar {
            height: 300px;
            padding: 20px;

            background-color: #8f8fff26;
            border-radius: 12px;
        }
    }
}
</style>
