<script setup>
defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "upload", "createFolder"]);
</script>
<template>
  <div class="popup">
    <Transition name="fade">
      <div
        v-show="modelValue"
        class="popup-modal"
        @click="emit('update:modelValue', false)"
      ></div>
    </Transition>
    <Transition name="slide-up">
      <div v-show="modelValue" class="popup-content">
        <div class="button-grid">
          <label>
            <span>Take Photo</span>
            <input
              type="file"
              accept="image/*"
              capture="camera"
              hidden
              @change="emit('upload', $event.target)"
            />
          </label>
          <label>
            <span>Image/Video</span>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              hidden
              @change="emit('upload', $event.target)"
            />
          </label>
          <label>
            <span>File</span>
            <input
              type="file"
              accept="*"
              multiple
              hidden
              @change="emit('upload', $event.target)"
            />
          </label>
          <label>
            <span>Create Folder</span>
            <button type="button" hidden @click="emit('createFolder')" />
          </label>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.popup-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);
}

.popup-content {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2;
  border-radius: 16px 16px 0 0;
  background-color: white;
}

.popup .button-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 8px;
  padding: 8px;
}
</style>
