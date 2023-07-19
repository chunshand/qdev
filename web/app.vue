<template>
    <div>
        <NuxtLayout></NuxtLayout>
    </div>
</template>
<style lang="scss">
*,
html,
body {
    padding: 0;
    margin: 0;
}

* {
    outline: none !important;
}

:root {
    .el-dialog {
        --el-dialog-border-radius: 16px
    }
}

.page-enter-active,
.page-leave-active {
    transition: all 0.1s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
