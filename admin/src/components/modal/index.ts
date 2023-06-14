import { mitter } from "@/utils/mitter";

const MODELKEY = 'modal:';

/**
 * 打开弹窗
 * @param ModalName 弹窗name
 */
export const handleEmitOpenModal = (ModalName: string, data: any) => {
  mitter.emit(`${MODELKEY}${ModalName}:open`, data)
}

/**
 * 关闭弹窗
 */
export const handleEmitCloseModal = (ModalName: string, data: any) => {
  mitter.emit(`${MODELKEY}${ModalName}:colse`, data)
}


/**
 * 关闭监听
 */
export const handleOffModal = (ModalName: string) => {
  mitter.off(`${MODELKEY}${ModalName}:open`)
  mitter.off(`${MODELKEY}${ModalName}:colse`)
}

