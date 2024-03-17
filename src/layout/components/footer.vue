<template>

  <t-row>
    <t-col :offset="3" :span="6" class="col_container">
      <p class="footer_text">
        &copy; 2024 WA Team. All Rights Reserved.
      </p>
    </t-col>
  </t-row>

</template>

<script>
export default {
  name: 'componentFooter',
  components: {},
  methods: {}
}
</script>

<style>

.col_container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-left: 16px; */
}

.footer_text {
  font-size: 12px;
  color: #999;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>