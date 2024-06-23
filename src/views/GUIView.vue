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
            </div>
        </main>
    </div>
</template>

<script setup>
import IconBase from '@/components/IconBase.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import AvatarComponent from '@/components/AvatarComponent.vue';

import { ref } from 'vue';

const msg = ref('Hello World!');
</script>

<style scoped lang="scss">
.gui-page {
    line-height: 30px;

    display: flex;
    flex-direction: column;

    min-height: 100vh;
    max-width: 1280px;
    margin: 0 auto;

    &__header {
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
    }
}
</style>
