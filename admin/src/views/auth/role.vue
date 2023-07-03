<!-- 角色管理 -->
<script lang="ts" setup>
import QdevTable from "@/components/Qdev/Table/index.vue"
import { createTableOptions, defaultTableOptions } from "@/components/Qdev/Table/interface";
import { listRole, createRole, deleteRole, updateRole } from "@/api/role"
import QdevFormModal from "@/components/Qdev/FormModal/index.vue"
import { FormOptions, createFormOptions } from "@/components/Qdev/Form/interface";
import { open } from "@/components/Qdev/Modal/help"
import { ref } from "vue";
/**
 * 设置权限弹窗name
 */
const SET_AUTH_MODAL_NAME = "setAuth";
const table_ref = ref();
const options: defaultTableOptions = createTableOptions({
    SeachConfig: {
        show: false
    },
    TableConfig: {
        api: {
            create: createRole,
            delete: deleteRole,
            update: updateRole,
            list: listRole
        },
        index: {
            show: true,
            bind: {
                label: '序号',
                width: 55,
                align: 'center'
            }
        },
        columns: [
            {
                bind: {
                    prop: 'name',
                    label: '角色名称'
                }
            },
        ],
        operation: {
            btns: {
                look: {
                    show: false
                },
                setAuth: {
                    show: true,
                    content: "设置权限",
                    bind: {
                        type: "text"
                    },
                    on: {
                        click() {
                            open(SET_AUTH_MODAL_NAME);
                        }
                    }
                },

            }
        }
    },
    ModalConfig: {
        form: {
            columns: [
                {
                    show: true,
                    label: '角色名称',
                    component: "el-input",
                    model: "name",
                    bind: {
                        placeholder: '请输入角色名称'
                    }
                },

            ],
            rules: {

            }
        }
    },

});
const setAuthForm: FormOptions = createFormOptions({
    columns: [
        {
            show: true,
            label: '权限设置',
            component: 'el-select', // TODO 自定义一个model组件 树形选择
            model: 'name',
            bind: {

            }
        }
    ]
});
</script>
<template>
    <div class="app-container">
        <QdevTable ref="table_ref" :options="options" />
        <QdevFormModal :modalName="SET_AUTH_MODAL_NAME" :Form="setAuthForm" />
    </div>
</template>
<style scoped></style>
