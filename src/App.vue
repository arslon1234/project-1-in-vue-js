<template>
  <div v-if="items.length === 0" class="loading">
    <Loading />
  </div>
  <div v-else-if="items.length">
    <div class="mt-4 wrapper">
      <div class="head">
        <nav>
          <button
            :class="Changebg1 ? 'nav_btn2' : 'nav_btn'"
            @click="ChangeCategory(null)"
            to="/"
          >
            Bce
          </button>
          <button
            :class="Changebg2 ? 'nav_btn2' : 'nav_btn'"
            @click="ChangeCategory(70)"
            to="/Новости"
          >
            Новости
          </button>
          <button
            :class="Changebg3 ? 'nav_btn2' : 'nav_btn'"
            @click="ChangeCategory(71)"
            to="/События"
          >
            События
          </button>
          <button
            :class="Changebg4 ? 'nav_btn2' : 'nav_btn'"
            @click="ChangeCategory(72)"
            to="/Акции"
          >
            Акции
          </button>
        </nav>
        <div class="input">
          <input type="text" @input="searchItem" placeholder="Search..." />
        </div>
      </div>
      <div class="all">
        <div class="items" v-for="item in items" :key="item.id">
          <p class="category_name">{{ item.category_name }}</p>
          <div class="all_img">
            <img :src="item.image_url" alt="img" />
          </div>
          <span class="sole">20.01.2021</span>
          <div class="item_title">
            <span>{{ item.title }}</span>
          </div>
          <div class="item_desc">
            <span>{{ item.description }}</span>
          </div>
        </div>
        <div class="footer">
          <v-pagination
            v-model="params.page"
            :pages="params.last_page"
            :range-size="1"
            active-color="#00d06c"
            @update:modelValue="getItem"
          />
          <div class="selection">
            <select v-model="selection" @change="SelectItem">
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import $http from "./plugins/axios";
import { debounce } from "./utils/functions";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import Loading from "./components/Loading.vue";
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
const Changebg1 = ref(true);
const Changebg2 = ref(false);
const Changebg3 = ref(false);
const Changebg4 = ref(false);
const selection = ref("12");
const items = ref([]);
const params = ref({
  page: 1,
  per_page: 12,
  last_page: null,
});
const filter = ref({
  category_id: null,
  word: null,
});
const SelectItem = () => {
  params.value.per_page = selection.value;
  getItem();
};
const ChangeCategory = (id) => {
  filter.value.category_id = id;
  getItem();
  if (id === null) {
    Changebg1.value = true;
    Changebg2.value = false;
    Changebg3.value = false;
    Changebg4.value = false;
  } else if (id === 70) {
    Changebg1.value = false;
    Changebg2.value = true;
    Changebg3.value = false;
    Changebg4.value = false;
  } else if (id === 71) {
    Changebg1.value = false;
    Changebg2.value = false;
    Changebg3.value = true;
    Changebg4.value = false;
  } else if (id === 72) {
    Changebg1.value = false;
    Changebg2.value = false;
    Changebg3.value = false;
    Changebg4.value = true;
  }
};
const searchItem = debounce(function (item) {
  console.log(item);
  filter.value.word = item.target.value;
  getItem();
}, 300);
const getItem = async () => {
  try {
    const {
      data: { data, links },
    } = await $http.get("news-page/news", {
      params: {
        per_page: params.value.per_page,
        page: params.value.page,
        ...filter.value,
      },
    });
    items.value = data;
    params.value.last_page = links.last_page;
  } catch (e) {
    console.log(e);
  }
};
getItem();
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .head {
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 5vw;
    nav {
      display: flex;
      .nav_btn {
        margin: 10px;
        text-decoration: none;
        border: 1px solid #00d06c;
        border-radius: 10px;
        padding: 8px 12px;
        background-color: #fff;
        color: #00d06c;
        font-size: 14px;
        font-weight: 600;
        font-family: sans-serif;
      }
      :hover {
        background-color: #00d06c;
        color: #fff;
      }
      .nav_btn2 {
        font-size: 14px;
        font-weight: 600;
        font-family: sans-serif;
        margin: 10px;
        text-decoration: none;
        border: 1px solid #00d06c;
        border-radius: 10px;
        padding: 8px 12px;
        background-color: #00d06c;
        color: #fff;
      }
    }
    .input {
      margin-left: 40px;
      input {
        width: 220px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid #dfdce7;
        outline: none;
        padding: 0px 5px;
        color: #000018;
        font-size: 15px;
        font-family: sans-serif;
      }
    }
  }
  .all {
    width: 100%;
    height: 100vh;
    display: flex;
    margin-top: 20px;
    justify-content: center;
    flex-wrap: wrap;
    .items {
      width: 390px;
      height: 490px;
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
        .sole {
          font-size: 13px;
          color: #b3b1b1;
          margin-top: 20px;
        }
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
        span {
          font-size: 13px;
          font-family: sans-serif;
          letter-spacing: 0.5px;
        }
      }

      .category_name {
        position: absolute;
        top: 210px;
        left: 20px;
        z-index: 3;
        background-color: #33cc66;
        color: #fff;
        font-size: 13px;
        font-family: sans-serif;
        padding: 6px 12px;
        border-radius: 6px;
        cursor: pointer;
      }
    }
    .footer {
      width: 90vw;
      margin-left: 5vw;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 100px;
    }
  }
  .footer {
    .selection {
      width: 130px;
      height: 30px;
      select {
        width: 100%;
        height: 100%;
        outline: none;
        border-radius: 5px;
      }
    }
  }
}
</style>
