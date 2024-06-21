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
                        <icon-base icon-name="call"><icon-call /></icon-base>
                        <icon-base icon-name="emoji"><icon-emoji /></icon-base>
                        <icon-base icon-name="check"><icon-check /></icon-base>
                        <icon-base icon-name="menu"><icon-menu /></icon-base>
                        <icon-base icon-name="more"><icon-more /></icon-base>
                        <icon-base icon-name="search"><icon-search /></icon-base>
                        <icon-base icon-name="send"><icon-send /></icon-base>
                        <icon-base icon-name="verified"><icon-verified /></icon-base>
                    </div>
                </div>

                <div class="gui-page__component-item">
                    <h3 class="gui-page__component-title">Компонент 2</h3>
                        <div>Компонент</div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import IconBase from '@/components/IconBase.vue';
import IconCall from '@/components/icons/IconCall.vue';
import IconEmoji from '@/components/icons/IconEmoji.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconMenu from '@/components/icons/IconMenu.vue';
import IconMore from '@/components/icons/IconMore.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconSend from '@/components/icons/IconSend.vue';
import IconVerified from '@/components/icons/IconVerified.vue';
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
    }
}
</style>
