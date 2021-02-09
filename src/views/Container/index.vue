<template>
  <div>
    <el-container>
      <el-header>
        <h3>电影信息展示平台</h3>
        <div>
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>

        </div>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="20" :gutter="40">
            <router-view/>
          </el-col>
          <el-col :span="4">
            <div class="top25">
              <span v-for="item in doubanTop25" :key="item.title">
                <el-link
                  style="margin-bottom: 4px"
                  :href="`/#/movies?douban_url=${item.url}&name=${item.title}&douban_type=movie`"
                >
                  {{ item.title }}
                </el-link>
                <br/>
              </span>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {useRouter} from "vue-router"
import {ref, onMounted} from 'vue'
import {getDoubanTop250Api} from '@/api/douban'
import {getSearchMovies} from "@/api/movies";


export default {
  name: 'Container',
  setup() {
    const router = useRouter()
    const store = useStore()
    const doubanTop25 = ref([])
    onMounted(async () => {
      const data = await getDoubanTop250Api()
      doubanTop25.value = data.top250
      doubanTop25.value.pop()
      store.commit('upDoubanTop24', doubanTop25.value)
    })


    let timeout;
    const querySearchAsync = async (queryString, cb) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const result = await getSearchMovies({q: queryString})
        const loadAll = []
        for (let item of result) {
          if (item.type !== "movie") continue
          loadAll.push({value: item.title, ...item})
        }
        cb(loadAll)
      }, 1000)
    }

    const handleSelect = (item) => {
      console.log(item)
      router.push({
        path: "/movies", query: {
          douban_url: item.url,
          name: item.title,
          douban_type: item.type
        }
      })
    }
    return {state: ref(''), doubanTop25, querySearchAsync, handleSelect}
  },
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;
  overflow: auto;

  .el-header {
    h3 {
      font-weight: 400;
      color: #fff;
      font-size: 18px;
      margin: 0;
    }

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #409eff;
  }

  .el-main {
    padding-top: 60px;
    color: #333;
    margin: 0 auto;
    width: 1200px;
    height: 100px;

    .top25 {
      padding: 12px;
      border-left: 1px solid #eee;
    }
  }
}
</style>
