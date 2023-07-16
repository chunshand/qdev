import { App } from "vue"
import QdevTable from "./Table/index.vue"
import QdevModal from "./Modal/index.vue"
import QdevForm from "./Form/index.vue"
import QdevFormModal from "./FormModal/index.vue"
import QdevUpload from "./Upload/index.vue"
export function loadQdev(app: App) {
  app.component("QdevUpload", QdevUpload)
  app.component("QdevForm", QdevForm)
  app.component("QdevModal", QdevModal)
  app.component("QdevFormModal", QdevFormModal)
  app.component("QdevTable", QdevTable)
}
