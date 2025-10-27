<template>
  <div
    v-if="visible"
    :class="[
      'fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white animate-slideIn',
      type === 'success' ? 'bg-green-500' : 'bg-red-500',
    ]"
  >
    <component
      :is="type === 'success' ? CheckCircle : AlertCircle"
      class="w-5 h-5"
    />
    <span>{{ message }}</span>
    <button @click="close" class="ml-2">
      <X class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { AlertCircle, CheckCircle, X } from "lucide-vue-next";

const props = defineProps({
  message: { type: String, required: true },
  type: { type: String, default: "success" }, // 'success' or 'error'
  onClose: { type: Function, required: true },
});

const visible = ref(true);
let timer;

const close = () => {
  visible.value = false;
  props.onClose?.();
};

onMounted(() => {
  timer = setTimeout(close, 4000);
});

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out;
}
</style>
