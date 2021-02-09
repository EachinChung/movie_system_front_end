<template>
  <div class="main-douban">
    <el-space wrap :size="20">
      <el-card
        :body-style="{ padding: '0px' }"
        style="width: 220px"
        v-for="item in $store.state.doubanTop24"
        :key="item.title"
        shadow="hover"
        @click="
          $router.push({
            path: '/movies',
            query: {
              douban_url: item.url,
              douban_type: 'movie',
              name: item.title,
            },
          })
        "
      >
        <el-image :src="item.img" class="image" />
        <div style="padding: 14px">
          <span>{{ item.title }}</span>
          <div class="bottom clearfix">
            <span class="time">{{ item.quote }}</span>
          </div>
        </div>
      </el-card>
    </el-space>
  </div>
</template>

<style lang="less" scoped>
.main-douban {
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }
}
</style>
