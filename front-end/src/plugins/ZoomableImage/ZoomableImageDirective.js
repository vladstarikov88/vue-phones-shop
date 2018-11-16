import bus from './bus'

export default function(el, binding) {
    el.addEventListener('click', () => bus.$emit('zoom-image', binding.src))
}