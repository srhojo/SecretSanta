<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Id
        </th>
        <th class="text-left">
          Price
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in products"
        :key="item.id"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.price }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.retrieveProducts()
  },
  methods: {
    retrieveProducts() {
      this.axios
        .get('products')
        .then((response) => {
          console.log(response.data)
          this.products = response.data.products
        })
        .catch((e) => {
          console.log('error' + e)
        })
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>