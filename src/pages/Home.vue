<script setup lang="ts">
import { computed, ref } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import ProductCardSkeleton from "@/components/ProductCardSkeleton.vue";
import { useProductStore } from "@/store/products";

const productStore = useProductStore();

const products = computed(() => productStore.list);
const responseMessage = ref<string>("");

const fetchStatus = async (status: number, type: "json" | "form" = "json") => {
  try {
    let response;
    if (type === "json") {
      response = await fetch(`https://httpbin.org/status/${status}`);
    } else {
      response = await fetch(`https://httpbin.org/status/${status}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 12345,
          title: "Article Example",
          description: "A detailed description of the article for customers.",
          price: 29.99,
          currency: "EUR",
          stock: 50,
          dateAdded: "2025-01-16",
          categories: ["Fashion", "Accessories"],
          seller: {
            name: "Demo Store",
            id: 789,
            rating: 4.8,
          },
          images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
          isFeatured: true,
          discount: {
            percentage: 10,
            validUntil: "2025-02-01",
          },
          specifications: {
            weight: "1.5kg",
            dimensions: "30x20x10cm",
            color: "Black",
            material: "Leather",
          },
        }),
      });
    }
  } catch (error) {
    responseMessage.value = `Error: ${error}`;
  }
};
</script>

<template>
  <div class="p-4 max-w-7xl mx-auto">
    <div class="list-container-wrapper">
      <div class="list-container">
        <div class="grid gap-4" data-cy="module_home_grid_product-list">
          <ProductCardSkeleton v-for="n in 15" v-show="!productStore.loaded" :key="n" />
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </div>

    <div class="flex">
      <button @click="fetchStatus(200)" class="btn" data-cy="module_home_button_get-200">Get 200</button>
      <button @click="fetchStatus(400)" class="btn" data-cy="module_home_button_get-400">Get 400</button>
    </div>
    <div class="flex">
      <button @click="fetchStatus(200, 'form')" class="btn" data-cy="module_home_button_get-form-200">
        Get Form 200
      </button>
    </div>

    <div class="text-center">
      <p>{{ responseMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.list-container-wrapper {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-height: 600px;
  position: relative;
  background: #ffffff;
}

.list-container {
  max-height: 600px;
  overflow-y: auto;
  padding: 1rem;
  position: relative;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8));
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100% 40px;
}

.list-container::-webkit-scrollbar {
  width: 8px;
}

.list-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.product-card-skeleton {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(0, 0, 0, 0) 75%);
  animation: loading 1.2s infinite;
  border-radius: 12px;
}

@keyframes loading {
  0% {
    background-position: -200%;
  }
  50% {
    background-position: 200%;
  }
  100% {
    background-position: -200%;
  }
}

.btn {
  padding: 12px 20px;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
}

.btn:hover {
  background-color: #6a11cb;
}

/* Message de réponse */
.text-center {
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
  color: #555;
}

.flex {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}
</style>
