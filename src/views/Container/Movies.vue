<!--suppress CssInvalidPropertyValue -->
<template>
  <div class="main">
    <el-skeleton :rows="5" :loading="loading" animated>
      <template #template>
        <div
          style="
            display: flex;
            align-items: center;
            justify-items: space-between;
            margin-top: 16px;
          "
        >
          <el-skeleton-item
            variant="image"
            style="width: 220px; height: 320px"
          />
          <div style="padding-left: 24px; width: 600px">
            <el-skeleton-item
              variant="h3"
              style="margin-bottom: 12px; width: 50%"
            />
            <br />
            <el-skeleton-item
              variant="h3"
              style="margin-bottom: 12px; width: 80%"
            />
            <br />
            <el-skeleton-item
              variant="h3"
              style="margin-bottom: 12px; width: 80%"
            />
            <br />
            <el-skeleton-item
              variant="h3"
              style="margin-bottom: 12px; width: 80%"
            />
            <br />
            <el-skeleton-item
              variant="h3"
              style="margin-bottom: 12px; width: 90%"
            />
            <br />
            <el-skeleton-item
              variant="h3"
              style="margin-bottom: 12px; width: 90%"
            />
            <br />
            <el-skeleton-item
              variant="h3"
              style="margin-bottom: 12px; width: 90%"
            />
            <br />
            <el-skeleton-item
              variant="h3"
              style="margin-bottom: 12px; width: 100%"
            />
            <br />
            <el-skeleton-item
              variant="h3"
              style="margin-bottom: 12px; width: 100%"
            />
          </div>
        </div>
        <br />
        <br />
        <el-skeleton-item
          variant="h3"
          style="margin-bottom: 12px; width: 100%"
        />
        <el-skeleton-item
          variant="h3"
          style="margin-bottom: 12px; width: 100%"
        />
        <el-skeleton-item
          variant="h3"
          style="margin-bottom: 12px; width: 100%"
        />
        <el-skeleton-item
          variant="h3"
          style="margin-bottom: 12px; width: 100%"
        />
      </template>

      <template #default>
        <div
          style="display: flex; justify-items: space-between; margin-top: 16px"
        >
          <el-image
            style="width: 220px; height: 320px"
            :src="movieData.image"
          />
          <div style="padding-left: 24px; width: 650px">
            <h2 class="title">{{ movieData.name }}</h2>
            <p>
              <span class="tag">导演：</span>
              <span v-for="item in movieData.director" :key="item">
                {{ item }}&nbsp;/
              </span>
            </p>
            <p>
              <span class="tag">编剧：</span>
              <span v-for="item in movieData.author" :key="item">
                {{ item }}&nbsp;/
              </span>
            </p>
            <p>
              <span class="tag">主演：</span>
              <span v-for="item in movieData.actor" :key="item">
                {{ item }}&nbsp;/
              </span>
            </p>
            <p>
              <span class="tag">上映日期：</span>
              <span>{{ movieData.datePublished }}</span>
            </p>
          </div>
        </div>

        <div>
          <br />
          <div>
            <span class="tag">剧情简介 · · · · · ·</span><br />
            <p v-for="item in movieData.description" :key="item">{{ item }}</p>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getMovies } from '@/api/movies'
export default {
  name: 'Movies',
  setup() {
    const route = useRoute()
    const movieData = ref({})
    const loading = ref(true)
    onMounted(async () => {
      loading.value = true
      movieData.value = await getMovies(route.query)
      loading.value = false
    })
    watch(
      () => route.query,
      async (newQuery) => {
        loading.value = true
        if (newQuery.douban_type == null) return
        movieData.value = await getMovies(newQuery)
        loading.value = false
      }
    )
    return { movieData, loading }
  },
}
</script>

<style lang="less" scoped>
.main {
  margin: 20px;
  .title {
    font-weight: 400;
    color: #1f2f3d;
    font-size: 28px;
    margin: 0;
  }
  .tag {
    color: #666666;
  }
}
</style>
