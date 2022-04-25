<template>
  <div class="container">
    <div class="all">
      <div class="items" v-for="item in props.events" :key="item.id">
        <p class="category_name">{{ item.category_name }}</p>
        <div class="all_img">
          <img :src="item.image_url" alt="img" />
        </div>
        <span>20.01.2021</span>
        <div class="item_title">
          <span>{{ item.title }}</span>
        </div>
        <div class="item_desc">
          <span>{{ item.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  events:{
    type: Array,
  }
})

</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.all {
  width: 100%;
  height: 100vh;
  display: flex;
  margin-top: 20px;
  justify-content: center;
  flex-wrap: wrap;
  .items {
    width: 300px;
    height: 450px;
    border: 1px solid #ebebeb;
    margin: 8px;
    border-radius: 15px;
    position: relative;
    .all_img {
      width: 100%;
      height: 50%;
      cursor: pointer;
      overflow: hidden;
      border-radius: 15px 15px 0px 0px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.3s;
      }
      :hover {
        transform: scale(1.1);
      }
    }
    .item_title {
      margin: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 18px;
        color: #303446;
        font-weight: 600;
        line-height: 20px;
      }
    }
    .item_desc {
      margin: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        font-size: 13px;
        font-family: sans-serif;
        letter-spacing: 0.5px;
      }
    }
    span {
      font-size: 13px;
      color: #b3b1b1;
      margin-top: 15px;
      margin-left: 15px;
    }
    .category_name {
      position: absolute;
      top: 185px;
      left: 18px;
      z-index: 3;
      background-color: #33cc66;
      color: #fff;
      font-size: 12px;
      font-family: sans-serif;
      padding: 4px 8px;
      border-radius: 6px;
      cursor: pointer;
    }
  }
}
</style>

