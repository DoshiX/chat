import { defineStore } from 'pinia';
import FormatChat from '@/helpers/FormatChat';

export const useChatStore = defineStore({
	id: 'chats',
	state: () => ({
		chats: [
			{
				id: 1,
				avatar_url: '',
				name: 'New chat',
				verified: true,
				status: 'offline', // online/offline
				last_seen_date: 'Thu Jun 26 2024 00:11:02 GMT+0300 (Москва, стандартное время)',
				messages: [],
			},
			{
				id: 2,
				avatar_url: 'avatar-1.jpg',
				name: 'Jessica Drew',
				verified: false,
				status: 'offline', // online/offline
				last_seen_date: 'Thu Jun 26 2024 23:11:02 GMT+0300 (Москва, стандартное время)',
				messages: [
					{
						id: 1,
						text: 'Ок, увидимся позже',
						sent_date: 'Thu Jun 26 2024 18:30:02 GMT+0300 (Москва, стандартное время)',
						read: false,
					},
				],
			},
			{
				id: 3,
				avatar_url: 'avatar-2.png',
				name: 'David Moore',
				verified: true,
				status: 'offline', // online/offline
				last_seen_date: 'Thu Jun 26 2024 23:11:02 GMT+0300 (Москва, стандартное время)',
				messages: [
					{
						id: 1,
						text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						sent_date: 'Thu Jun 26 2024 00:11:02 GMT+0300 (Москва, стандартное время)',
						read: true,
					},
					{
						id: 2,
						text: 'Ок, увидимся',
						sent_date: 'Thu Jun 26 2024 18:16:02 GMT+0300 (Москва, стандартное время)',
						read: true,
					},
				],
			},
			{
				id: 4,
				avatar_url: 'avatar-3.png',
				name: 'Чат 4',
				verified: false,
				status: 'offline', // online/offline
				last_seen_date: 'Thu Jun 25 2024 00:11:02 GMT+0300 (Москва, стандартное время)',
				messages: [
					{
						id: 1,
						text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						sent_date: 'Thu Jun 24 2024 18:12:02 GMT+0300 (Москва, стандартное время)',
						read: false,
					},
				],
			},
			{
				id: 5,
				avatar_url: 'avatar-4.png',
				name: 'Чат 5',
				verified: false,
				status: 'offline', // online/offline
				last_seen_date: 'Thu Jun 25 2024 00:11:02 GMT+0300 (Москва, стандартное время)',
				messages: [
					{
						id: 1,
						text: 'Завтра напомни мне по поводу дня X',
						sent_date: 'Thu Jun 24 2024 17:42:02 GMT+0300 (Москва, стандартное время)',
						read: true,
					},
				],
			},
			{
				id: 6,
				avatar_url: 'avatar-5.jpg',
				name: 'Чат 7',
				verified: false,
				status: 'offline', // online/offline
				last_seen_date: 'Thu Jun 25 2024 00:11:02 GMT+0300 (Москва, стандартное время)',
				messages: [
					{
						id: 1,
						text: 'Все готово',
						sent_date: 'Thu Jun 24 2024 17:22:02 GMT+0300 (Москва, стандартное время)',
						read: true,
					},
				],
			},
			{
				id: 7,
				avatar_url: 'avatar-6.png',
				name: 'Чат 8',
				verified: false,
				status: 'offline', // online/offline
				last_seen_date: 'Thu Jun 25 2024 00:11:02 GMT+0300 (Москва, стандартное время)',
				messages: [
					{
						id: 1,
						text: 'Передай маме, что я буду к 8',
						sent_date: 'Thu Jun 23 2024 15:43:02 GMT+0300 (Москва, стандартное время)',
						read: true,
					},
				],
			},
			{
				id: 8,
				avatar_url: 'avatar-7.jpg',
				name: 'Чат 9',
				verified: false,
				status: 'offline', // online/offline
				last_seen_date: 'Thu Jun 25 2024 00:11:02 GMT+0300 (Москва, стандартное время)',
				messages: [
					{
						id: 1,
						text: 'Поехали отдыхать🏝',
						sent_date: 'Thu Jun 22 2024 13:39:02 GMT+0300 (Москва, стандартное время)',
						read: true,
					},
				],
			},
			{
				id: 9,
				avatar_url: '',
				name: 'Satoru Gojo',
				verified: true,
				status: 'offline', // online/offline
				last_seen_date: 'Thu Jun 22 2024 00:11:02 GMT+0300 (Москва, стандартное время)',
				messages: [
					{
						id: 1,
						text: 'Прибыл',
						sent_date: 'Thu Jun 21 2024 23:11:02 GMT+0300 (Москва, стандартное время)',
						read: false,
					},
				],
			},
		],
		current_chat_index: null,
	}),

	getters: {
		getChats: (state) => {
			const formatedChats = state.chats.map((chat) => {
				return FormatChat(chat);
			});

			return formatedChats;
		},

		getCurrentSelectedChat: (state) => {
			return state.getChats[state.current_chat_index];
		},
	},
	
	actions: {
		selectCurrentChat(chat_id) {
			if (this.current_chat_index !== null) {
				const previousSelectedChat = this.chats[this.current_chat_index];
				delete previousSelectedChat.is_active;
			}
			
			const selectedChatIndex = this.chats.findIndex((chat) => chat_id === chat.id);

			this.chats[selectedChatIndex].is_active = true;

			this.current_chat_index = selectedChatIndex;

			this.readMessages();
		},

		selectDefaultCurrentChat() {
			this.selectCurrentChat(this.chats[0].id);
		},

		sendMessage(text) {
			const { messages } = this.chats[this.current_chat_index];

			const messagePayload = {
				id: messages.length ? messages[messages.length - 1].id + 1 : 0,
				text: text,
				sent_date: new Date(),
				read: true,
			};

			messages.push(messagePayload);
		},

		readMessages() {
			const { messages } = this.chats[this.current_chat_index];
			
			if (messages.length) {
				messages.forEach((message)=> {
					message.read = true;
				}); 
			}
		},
	},
});
