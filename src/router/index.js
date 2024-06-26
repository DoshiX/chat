import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/ChatView.vue'),
		},
		{
			path: '/gui',
			name: 'gui',
			component: () => import('@/views/GUIView.vue'),
		},
	],
});

export default router;
