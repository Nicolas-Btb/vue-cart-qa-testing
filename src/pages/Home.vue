<script setup lang="ts">
import { computed, ref } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import ProductCardSkeleton from "@/components/ProductCardSkeleton.vue";
import { useProductStore } from "@/store/products";

const productStore = useProductStore();

const products = computed(() => productStore.list);
const responseMessage = ref<string>("");

// Fonction pour simuler des appels API
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
          id: 12345, // Identifiant unique de l'article
          title: "Article Example", // Titre de l'article
          description:
            "Une description détaillée de l'article pour les clients.", // Description complète
          price: 29.99, // Prix de l'article
          currency: "EUR", // Devise utilisée
          stock: 50, // Quantité disponible en stock
          dateAdded: "2025-01-16", // Date d'ajout de l'article
          categories: ["Mode", "Accessoires"], // Catégories associées à l'article
          seller: {
            name: "Boutique Demo", // Nom du vendeur
            id: 789, // Identifiant du vendeur
            rating: 4.8, // Note moyenne du vendeur
          },
          images: [
            "https://example.com/image1.jpg", // URL de l'image principale
            "https://example.com/image2.jpg", // URL de l'image secondaire
          ],
          isFeatured: true, // Indique si l'article est mis en avant
          discount: {
            percentage: 10, // Réduction en pourcentage
            validUntil: "2025-02-01", // Date limite de la réduction
          },
          specifications: {
            weight: "1.5kg", // Poids de l'article
            dimensions: "30x20x10cm", // Dimensions de l'article
            color: "Noir", // Couleur principale
            material: "Cuir", // Matériau principal
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
        <div class="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-">
          <ProductCardSkeleton
            v-for="n in 15"
            v-show="!productStore.loaded"
            :key="n"
          />
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>

    <div class="grid justify-center gap-4 mt-6">
      <div class="flex justify-center gap-4 mt-6">
        <button @click="fetchStatus(200)" class="btn">Get 200</button>
        <button @click="fetchStatus(400)" class="btn">Get 400</button>
      </div>
      <button @click="fetchStatus(200, 'form')" class="btn">
        Get Form 200
      </button>
    </div>

    <div class="mt-4 text-center text-gray-600">
      <p>{{ responseMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.list-container-wrapper {
  border: 2px solid #ddd; /* Bordure */
  border-radius: 12px; /* Rayon de la bordure */
  overflow: hidden; /* Cache tout ce qui dépasse du conteneur */
  max-height: 600px;
  position: relative; /* Nécessaire pour positionner le pseudo-élément */
}

.list-container {
  max-height: 600px;
  overflow-y: auto; /* Ajoute une barre de défilement verticale */
  padding: 1rem;
  position: relative; /* Nécessaire pour positionner correctement le dégradé */
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  ); /* Dégradé de fondu */
  background-position: bottom; /* Le dégradé se place en bas */
  background-repeat: no-repeat; /* Évite que le dégradé soit répété */
  background-size: 100% 40px; /* Ajuste la taille du dégradé, ici 40px de hauteur */
}

.list-container::-webkit-scrollbar {
  width: 8px;
}

.list-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #686868;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.btn:active {
  background-color: #003f7f;
}
</style>
