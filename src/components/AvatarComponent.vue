<template>
    <div :class="[AVATAR_SIZES[size], 'avatar']">
        <div class="avatar__photo" v-if="isImageLoaded && isPhotoExists">
            <img
                class="avatar__photo--img"
                :src="imgSrc"
                @error="imgHandler"
                @load="imgHandler"
            >
        </div>

        <div v-else class="avatar__stub">
            <span class="avatar__stub-text">{{ stubText }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeUpdate, onBeforeMount } from 'vue';
import { AVATAR_SIZES } from '@/constants';

const props = defineProps({
	photoName: {
		type: String,
	},
	size: {
		type: String,
		default: 'medium',
	},
	stubText: {
		type: String,
	},
});

const imgSrc = ref(null);

onBeforeUpdate(()=> {
	imgSrc.value = requireImage();
});

onBeforeMount(()=> {
	imgSrc.value = requireImage();
});

const requireImage = () => {
	if (props.photoName) {
		isPhotoExists.value = true;

		const photoUrl = new URL(`../assets/images/${props.photoName}`, import.meta.url).href;
		isImageLoaded.value = true;

		return photoUrl;
	}

	isPhotoExists.value = false;

	return null;
};

const isImageLoaded = ref(false);
const isPhotoExists = ref(false);

const imgHandler = function (event) {
	const { type } = event;

	if (type === 'error') isImageLoaded.value = false; 
	if (type === 'load') isImageLoaded.value = true; 
};
</script>

<style scoped lang="scss">
.avatar {
    cursor: default;
    
    &--small {
        width: $avatar-small;
        height: $avatar-small;
    }

    &--medium {
        width: $avatar-medium;
        height: $avatar-medium;
    }

    &__photo {
        width: inherit;
        height: inherit;

        &--img {
            width: inherit;
            height: inherit;

            object-fit: cover;
            border-radius: 50%;
        }
    }

    &__stub {
        font-weight: 600;

        display: flex;
        align-items: center;
        justify-content: center;

        color: $avatar-stub-text-color;
        border-radius: 50%;
        background-color: $avatar-stub-background-color;

        width: inherit;
        height: inherit;

        &-text {
            overflow: hidden;
            white-space: nowrap;

            padding: 1px;

            text-overflow: ellipsis;
        }
    }
}
</style>
