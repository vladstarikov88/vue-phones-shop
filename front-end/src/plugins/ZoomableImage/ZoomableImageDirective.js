import bus from './bus'

export default function(el, binding) {
    el.addEventListener('click', () => bus.$emit('zoom-image', binding.value));
    el.style.cursor = 'zoom-in';
}