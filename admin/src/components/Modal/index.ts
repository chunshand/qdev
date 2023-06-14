import { mitter } from "@/utils/mitter";

const MODELKEY = 'modal:';

/**
 * 打开弹窗
 * @param ModalName 弹窗name
 */
export const handleEmitOpenModal = (ModalName: string, data: any = null) => {
  mitter.emit(`${MODELKEY}${ModalName}:open`, data)
}

/**
 * 关闭弹窗
 */
export const handleEmitCloseModal = (ModalName: string, data: any = null) => {
  mitter.emit(`${MODELKEY}${ModalName}:colse`, data)
}

/**
 * 监听弹窗打开
 */
export const handleOnOpenModal = (ModalName: string, fn: Function) => {
  mitter.on(`${MODELKEY}${ModalName}:open`, (...args) => {
    fn.apply(this, ...args)
  })
}
/**
 * 监听弹窗打开
 */
export const handleOnCloseModal = (ModalName: string, fn: Function) => {
  mitter.on(`${MODELKEY}${ModalName}:close`, (...args) => {
    fn.apply(this, ...args)
  })
}

/**
 * 关闭监听
 */
export const handleOffModal = (ModalName: string) => {
  mitter.off(`${MODELKEY}${ModalName}:open`)
  mitter.off(`${MODELKEY}${ModalName}:colse`)
}
