import { mitter } from "@/utils/mitter";

interface ModalOptions {
  open: Function,
  close: Function
}
const MODELKEY = 'modal:';

/**
 * 监听
 * @param ModalName
 * @param modalOptions
 */
export const on = (ModalName: string, modalOptions: ModalOptions) => {
  mitter.on(`${MODELKEY}${ModalName}:open`, (arg: any) => {
    modalOptions.open(arg)
  })
  mitter.on(`${MODELKEY}${ModalName}:close`, (arg: any) => {
    modalOptions.close(arg)
  })
}
/**
 * 取消监听
 * @param ModalName
 */
export const off = (ModalName: string) => {
  mitter.off(`${MODELKEY}${ModalName}:open`)
  mitter.off(`${MODELKEY}${ModalName}:close`)
}

/**
 * 打开弹窗
 * @param ModalName 弹窗Name
 */
export const open = (ModalName: string, data: any = null) => {
  mitter.emit(`${MODELKEY}${ModalName}:open`, data)
}

/**
 * 关闭弹窗
 */
export const close = (ModalName: string, data: any = null) => {
  mitter.emit(`${MODELKEY}${ModalName}:colse`, data)
}
