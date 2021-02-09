import {
  ElButton,
  ElContainer,
  ElHeader,
  ElMain,
  ElSpace,
  ElCol,
  ElRow,
  ElImage,
  ElDivider,
  ElLink,
  ElCard,
  ElSkeleton,
  ElSkeletonItem,
  ElInput,
  ElAutocomplete,
  ElForm,
  ElFormItem,
  ElIcon,
  ElAlert,
  ElRadio,
  ElCollapse,
  ElCollapseItem,
  ElPagination,
} from 'element-plus';

const setupElement = {
  install: app => {
    app.use(ElButton)
      .use(ElContainer)
      .use(ElHeader)
      .use(ElMain)
      .use(ElSpace)
      .use(ElCol)
      .use(ElRow)
      .use(ElImage)
      .use(ElDivider)
      .use(ElLink)
      .use(ElCard)
      .use(ElSkeleton)
      .use(ElSkeletonItem)
      .use(ElInput)
      .use(ElAutocomplete)
      .use(ElForm)
      .use(ElFormItem)
      .use(ElIcon)
      .use(ElAlert)
      .use(ElRadio)
      .use(ElCollapse)
      .use(ElCollapseItem)
      .use(ElPagination)
  }
}

export default setupElement
