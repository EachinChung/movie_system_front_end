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
  }
}

export default setupElement
