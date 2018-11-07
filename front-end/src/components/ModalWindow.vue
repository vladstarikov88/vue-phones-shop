<template>
    <div class="modal" :class="{ 'is-active': isOpen}">
        <div class="modal-backgroung">
            <div class="modal-content">
                <div class="box">
                    <slot></slot> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalWindow",
    props: ['isOpen'],
}
</script>

<style scoped lang="scss">

</style>
