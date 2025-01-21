<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/store/products'

const productStore = useProductStore()
const router = useRouter()
const input = ref('')

const searchResults = computed(() => {
  if (!input.value || input.value.length < 2)
    return []

  return productStore.list.filter((item) => {
    return item.title.toLowerCase().includes(input.value.toLowerCase())
  })
})

function navigate(id: number) {
  input.value = ''
  router.push(`/product/${id}`)
}
</script>

<template>
  <div class="dropdown dropdown-end" data-cy="dropdown">
    <div class="form-control">
      <input v-model="input" type="text" placeholder="Search..." class="input input-ghost"
        :disabled="!productStore.loaded" data-cy="module_search_input_search">
    </div>
    <ul class="shadow menu dropdown-content bg-base-100 rounded-box w-64 text-base-content overflow-y-scroll"
      style="max-height: 50vh;" data-cy="module_search_dropdown_items-list">
      <li v-for="(product, index) in searchResults" :key="product.id"
        :data-cy="`module_search_dropdown-item-${index + 1}`">
        <a href="#" :data-cy="`module_search_dropdown_item-link-${index + 1}`" @click.prevent="navigate(product.id)"
          v-text="product.title" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown-content {
  z-index: 10;
}
</style>