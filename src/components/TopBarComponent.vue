<template>
    <div class="top-bar__wrapper">
        <div class="top-bar">
            <div class="top-bar__user">
                <AvatarComponent
                    size="small"
                    :stubText="GetFirstLetterString(user.name)"
                    :photoName="user.avatar_url"
                />

                <div class="top-bar__user-info">
                    <div class="top-bar__user-name">
                        <span class="top-bar__user-name-text">{{ user.name }}</span>
                        <icon-base
                            v-if="user.verified"
                            class="top-bar__user-icon"
                            icon-name="verified"
                            icon-color="#1a9cff"
                            width="18" 
                            height="18"
                        />
                    </div>
                    <span class="top-bar__user-status">{{ user.online_status }}</span>
                </div>
            </div>

            <div class="top-bar__control-buttons">
                <ButtonComponent
                    prefixIcon
                    iconName="search"
                    theme="grey"
                    @click="$emit('searchClick')"
                />

                <ButtonComponent
                    prefixIcon
                    iconName="call"
                    theme="grey"
                    @click="$emit('callClick')"
                />

                <ButtonComponent
                    prefixIcon
                    iconName="more"
                    theme="grey"
                    @click="$emit('optionsClick')"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { GetFirstLetterString } from '@/helpers';
import AvatarComponent from '@/components/AvatarComponent.vue';
import IconBase from '@/components/IconBase.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

const props = defineProps ({
	user: {
		type: Object,
		required: true,
	},
});

</script>

<style scoped lang="scss">
.top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    height: $top-bar-height;
    padding: 8px 16px;

    border-bottom: 1px solid $top-bar-border-color;

    background-color: $top-bar-background-color;

    &__user {
        display: flex;
        gap: 16px;

        height: $top-bar-user-height;

        &-info {
            display: flex;
            flex-direction: column;
            justify-content: end;
            gap: 4px;

            height: 42px;
        }

        &-name {
            font-weight: 600;

            display: flex;
            align-items: center;
            gap: 4px;

            &-text {
                @include line-clamp-text-formated;

                -webkit-line-clamp: 1;
                text-overflow: ellipsis;
            }
        }

        &-icon {
            flex-shrink: 0;
        }

        &-status {
            font-size: $top-bar-user-status-font-size;
            line-height: $top-bar-user-status-line-height;

            color: $top-bar-user-status-color;

            @include line-clamp-text-formated;

            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
        }
    }

    &__control-buttons {
        display: flex;
        gap: 12px;
    }
}
</style>
